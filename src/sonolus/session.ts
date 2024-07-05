import { ServerOptionsModel } from '../models/options/option'
import { SonolusCtx } from '../routes/handler'
import { MaybePromise } from '../utils/promise'

export type SessionHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => MaybePromise<boolean>

export const defaultSessionHandler = (): boolean => true
