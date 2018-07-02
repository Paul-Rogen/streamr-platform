// @flow

import { error as errorNotification } from 'react-notification-system-redux'

import type { ErrorInUi } from '../../flowtype/common-types'
import type { Stream } from '../../flowtype/stream-types'
import type { Permission } from '../../flowtype/permission-types'
import * as api from '../../utils/api'

type StreamId = $ElementType<Stream, 'id'>
type PermissionOperation = Array<$ElementType<Permission, 'operation'>>

export const GET_STREAM_REQUEST = 'GET_STREAM_REQUEST'
export const GET_STREAM_SUCCESS = 'GET_STREAM_SUCCESS'
export const GET_STREAM_FAILURE = 'GET_STREAM_FAILURE'

export const GET_MY_STREAM_PERMISSIONS_REQUEST = 'GET_MY_STREAM_PERMISSIONS_REQUEST'
export const GET_MY_STREAM_PERMISSIONS_SUCCESS = 'GET_MY_STREAM_PERMISSIONS_SUCCESS'
export const GET_MY_STREAM_PERMISSIONS_FAILURE = 'GET_MY_STREAM_PERMISSIONS_FAILURE'

export const OPEN_STREAM = 'OPEN_STREAM'

const apiUrl = `${process.env.STREAMR_API_URL}/streams`

export const openStream = (id: StreamId) => ({
    type: OPEN_STREAM,
    id,
})

const getStreamRequest = () => ({
    type: GET_STREAM_REQUEST,
})

const getStreamSuccess = (stream: Stream) => ({
    type: GET_STREAM_SUCCESS,
    stream,
})

const getStreamFailure = (error: ErrorInUi) => ({
    type: GET_STREAM_FAILURE,
    error,
})

const getMyStreamPermissionsRequest = () => ({
    type: GET_MY_STREAM_PERMISSIONS_REQUEST,
})

const getMyStreamPermissionsSuccess = (id: StreamId, permissions: PermissionOperation) => ({
    type: GET_MY_STREAM_PERMISSIONS_SUCCESS,
    id,
    permissions,
})

const getMyStreamPermissionsFailure = (error: ErrorInUi) => ({
    type: GET_MY_STREAM_PERMISSIONS_FAILURE,
    error,
})

export const getStream = (id: StreamId) => (dispatch: Function) => {
    dispatch(getStreamRequest())
    return api.get(`${apiUrl}/${id}`)
        .then((data: Stream) => dispatch(getStreamSuccess(data)))
        .catch((e) => {
            dispatch(getStreamFailure(e))
            dispatch(errorNotification({
                title: 'Error!',
                message: e.message,
            }))
            throw e
        })
}

export const getMyStreamPermissions = (id: StreamId) => (dispatch: Function, getState: Function) => {
    dispatch(getMyStreamPermissionsRequest())
    return api.get(`${apiUrl}/${id}/permissions/me`)
        .then((data) => {
            const currentUser = getState().user
            return dispatch(getMyStreamPermissionsSuccess(
                id,
                data
                    .filter((item) => item.user === currentUser.username)
                    .map((item) => item.operation),
            ))
        })
        .catch((e) => {
            dispatch(getMyStreamPermissionsFailure(e))
            dispatch(errorNotification({
                title: 'Error!',
                message: e.message,
            }))
            throw e
        })
}
