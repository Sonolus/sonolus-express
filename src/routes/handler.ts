import { NextFunction, Request, Response } from 'express'
import { ParsedOptionsQuery } from '../models/forms/query'
import { ServerOptionsModel } from '../models/options/option'
import { Localize } from '../utils/localization'
import { MaybePromise } from '../utils/promise'

export type SonolusCtx<TConfigurationOptions extends ServerOptionsModel> = {
    session: string | undefined
    localization: string
    options: ParsedOptionsQuery<TConfigurationOptions>
}

export type SonolusRouteHandler<TConfigurationOptions extends ServerOptionsModel> = (ctx: {
    req: Request
    res: Response
    next: NextFunction
    localize: Localize
    ctx: SonolusCtx<TConfigurationOptions>
}) => MaybePromise<void>
