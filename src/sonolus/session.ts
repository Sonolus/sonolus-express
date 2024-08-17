import { ServerOptionsModel } from '../models/server/options/option'
import { SonolusCtx } from '../routes/ctx'
import { HandlerResponse } from '../routes/handler'

export type SessionHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => HandlerResponse<true, 401>
