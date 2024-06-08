import { NextFunction, Request, Response } from 'express'
import { Localize } from '../utils/localization'
import { MaybePromise } from '../utils/promise'

export type SonolusRouteHandler = (ctx: {
    req: Request
    res: Response
    next: NextFunction
    localization: string
    localize: Localize
    session: string | undefined
}) => MaybePromise<void>
