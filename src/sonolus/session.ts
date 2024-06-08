import { MaybePromise } from '../utils/promise'

export type SessionHandler = (ctx: { session: string | undefined }) => MaybePromise<boolean>

export const defaultSessionHandler = (): boolean => true
