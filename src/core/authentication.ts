import { AuthenticateServerRequest, AuthenticateServerResponse } from 'sonolus-core'
import { Promisable } from '../utils/types'
import { SonolusCallback } from './sonolus'

export type AuthenticateHandler = SonolusCallback<
    [authenticateRequest: AuthenticateServerRequest],
    Promisable<AuthenticateServerResponse | undefined>
>

export const defaultAuthenticateHandler: AuthenticateHandler = () => undefined

export type SessionHandler = SonolusCallback<[session: string | undefined], Promisable<boolean>>

export const defaultSessionHandler: SessionHandler = () => true
