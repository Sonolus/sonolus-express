import { NextFunction, Request, Response } from 'express'
import { ServerOptionsModel } from '../models/server/options/option.js'
import { Localize } from '../utils/localization.js'
import { MaybePromise } from '../utils/promise.js'
import { SonolusCtx } from './ctx.js'
import { ServerError } from './error.js'

export type SonolusRouteHandler<TConfigurationOptions extends ServerOptionsModel> = (ctx: {
    req: Request
    res: Response
    next: NextFunction
    localize: Localize
    ctx: SonolusCtx<TConfigurationOptions>
}) => MaybePromise<void>

export type HandlerResponse<T, E extends number> = MaybePromise<T | ServerError<E>>
