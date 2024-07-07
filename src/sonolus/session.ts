import { ServerOptionsModel } from '../models/server/options/option'
import { SonolusCtx } from '../routes/ctx'
import { MaybePromise } from '../utils/promise'

export type SessionHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => MaybePromise<boolean>

export const defaultSessionHandler = (): boolean => true
