// @flow

import { createAction } from 'redux-actions'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants'
import type { ShowNotificationActionCreator, HideNotificationActionCreator } from './types'
import type { Hash } from '../../flowtype/web3-types'

export const showNotification: ShowNotificationActionCreator = createAction(
    SHOW_NOTIFICATION,
    (title: string, description?: string) => ({
        id: Date.now(),
        created: Date.now(),
        title,
        description,
    }),
)

export const showTransactionNotification: ShowNotificationActionCreator = createAction(
    SHOW_NOTIFICATION,
    (txHash?: Hash) => ({
        id: Date.now(),
        created: Date.now(),
        txHash,
    }),
)

export const hideNotification: HideNotificationActionCreator = createAction(
    HIDE_NOTIFICATION,
    (id: number) => ({
        id,
    }),
)
