// @flow

import type { PayloadAction, ErrorInUi } from '$shared/flowtype/common-types'
import type { ApiKey, User } from '$shared/flowtype/user-types'

export type ApiKeyAction = PayloadAction<{
    apiKey: ApiKey,
}>
export type ApiKeyActionCreator = (apiKey: ApiKey) => ApiKeyAction

export type UserDataAction = PayloadAction<{
    user: User
}>
export type UserDataActionCreator = (user: User) => UserDataAction

export type UserErrorAction = PayloadAction<{
    error: ErrorInUi,
}>
export type UserErrorActionCreator = (error: ErrorInUi) => UserErrorAction

export type LogoutErrorAction = PayloadAction<{
    error: ErrorInUi,
}>
export type LogoutErrorActionCreator = (error: ErrorInUi) => LogoutErrorAction
