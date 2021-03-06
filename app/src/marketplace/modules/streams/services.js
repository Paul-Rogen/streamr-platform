// @flow

import { get } from '$shared/utils/api'
import routes from '$routes'
import type { ApiResult } from '$shared/flowtype/common-types'
import type { StreamId, StreamList } from '$shared/flowtype/stream-types'

export const getStreams = (params: any): ApiResult<{
    streams: StreamList,
    hasMoreResults: boolean,
}> => {
    const nextParams = {
        uiChannel: false,
        operation: 'STREAM_SHARE',
        ...(params || {}),
    }

    if (nextParams.max) {
        // query 1 extra element to determine if we should show "load more" button
        nextParams.max += 1
    }

    return get({
        url: routes.api.streams.index({
            ...nextParams,
        }),
    })
        .then((streams) => ({
            streams: nextParams.max ? streams.splice(0, nextParams.max - 1) : streams,
            hasMoreResults: !!nextParams.max && streams.length > 0,
        }))
}

export const getStreamData = (streamId: StreamId, fromTimestamp: number): ApiResult<Object> => get({
    url: routes.api.streams.data.from({
        fromTimestamp,
        partition: 0,
        streamId,
    }),
})
