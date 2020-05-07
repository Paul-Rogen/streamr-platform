// @flow

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type Match } from 'react-router-dom'
import {
    closeStream,
    getMyStreamPermissions,
    getStream,
    getStreamStatus,
    initEditStream,
    openStream,
    updateEditStream,
} from '$userpages/modules/userPageStreams/actions'
import { handleLoadError } from '$auth/utils/loginInterceptor'
import { NotificationIcon } from '$shared/utils/constants'
import {
    selectPermissions,
    selectFetching,
    selectUpdating,
    selectOpenStream,
    selectEditedStream,
} from '$userpages/modules/userPageStreams/selectors'
import { selectUserData } from '$shared/modules/user/selectors'
import Notification from '$shared/utils/Notification'
import ResourceNotFoundError from '$shared/errors/ResourceNotFoundError'
import useFailure from '$shared/hooks/useFailure'
import Edit from './Edit'
import View from './View'
import Layout from '$shared/components/Layout/Core'
import useIsMounted from '$shared/hooks/useIsMounted'
import { getMyResourceKeys } from '$shared/modules/resourceKey/actions'

type Props = {
    match: Match,
}

const StreamPage = (props: Props) => {
    const { id: idProp } = props.match.params || {}

    const permissions = useSelector(selectPermissions)

    const fetching = useSelector(selectFetching)

    const updating = useSelector(selectUpdating)

    const dispatch = useDispatch()

    const fail = useFailure()

    const readOnly = !permissions || !permissions.some((p) => p === 'write')

    const canShare = !!permissions && permissions.some((p) => p === 'share')

    const stream = useSelector(selectOpenStream)

    const editedStream = useSelector(selectEditedStream)

    const currentUser = useSelector(selectUserData)

    const isMounted = useIsMounted()

    const { id } = stream || {}

    useEffect(() => {
        const fetch = async () => {
            try {
                try {
                    await dispatch(getMyResourceKeys())
                } catch (e) { /**/ }
                if (!isMounted()) {
                    return
                }
                try {
                    await Promise.all([
                        dispatch(getStream(idProp)),
                        dispatch(getMyStreamPermissions(idProp)),
                    ])
                    if (isMounted()) {
                        dispatch(openStream(idProp))
                    }
                } catch (e) {
                    await handleLoadError(e)
                }
            } catch (e) {
                if (e instanceof ResourceNotFoundError) {
                    fail(e)
                    return
                }
                Notification.push({
                    title: e.message,
                    icon: NotificationIcon.ERROR,
                })
                throw e
            }
        }

        fetch()
    }, [fail, dispatch, idProp, isMounted])

    useEffect(() => {
        const initEditing = async () => {
            // Get stream status before copying state to edit stream object.
            try {
                // The status query might fail due to cassandra problems. Ignore error to prevent
                // the stream page from getting stuck while loading
                await dispatch(getStreamStatus(id))
            } catch (e) {
                console.warn(e)
            }
            if (isMounted()) {
                dispatch(initEditStream())
            }
        }

        if (!readOnly && id) {
            initEditing()
        }
    }, [id, readOnly, dispatch, isMounted])

    useEffect(() => () => {
        dispatch(updateEditStream(null))
        dispatch(closeStream())
    }, [dispatch])

    if ((fetching && !updating) || !stream || (!readOnly && !editedStream)) {
        return (
            <Layout loading />
        )
    }

    return readOnly ? (
        <View
            stream={stream}
            currentUser={currentUser}
        />
    ) : (
        <Edit
            stream={editedStream}
            currentUser={currentUser}
            canShare={canShare}
            disabled={updating}
        />
    )
}

export default StreamPage