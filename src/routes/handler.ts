import { NextFunction, Request, Response } from 'express'
import { ServerOptionsModel } from '../models/server/options/option'
import { Localize } from '../utils/localization'
import { MaybePromise } from '../utils/promise'
import { SonolusCtx } from './ctx'

export type SonolusRouteHandler<TConfigurationOptions extends ServerOptionsModel> = (ctx: {
    req: Request
    res: Response
    next: NextFunction
    localize: Localize
    ctx: SonolusCtx<TConfigurationOptions>
}) => MaybePromise<void>
