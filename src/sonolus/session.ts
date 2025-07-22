import { ServerOptionsModel } from '../models/server/options/option.js'
import { SonolusCtx } from '../routes/ctx.js'
import { HandlerResponse } from '../routes/handler.js'

export type SessionHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => HandlerResponse<true, 401>
