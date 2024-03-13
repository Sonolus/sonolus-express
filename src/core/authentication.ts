import { AuthenticateServerRequest, AuthenticateServerResponse } from 'sonolus-core'
import { Promisable } from '../utils/types'
import { SonolusBase } from './sonolus'

export type AuthenticateHandler<TSonolus extends SonolusBase> = (
    sonolus: TSonolus,
    authenticateServerRequest: AuthenticateServerRequest,
) => Promisable<AuthenticateServerResponse | undefined>

export const defaultAuthenticateHandler: AuthenticateHandler<SonolusBase> = () => undefined

export type SessionHandler<TSonolus extends SonolusBase> = (
    sonolus: TSonolus,
    session: string | undefined,
) => Promisable<boolean>

export const defaultSessionHandler: SessionHandler<SonolusBase> = () => true
