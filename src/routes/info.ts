import { ServerInfoModel, toServerInfo } from '../models/info'
import { SonolusBase } from '../sonolus/base'
import { MaybePromise } from '../utils/promise'
import { SonolusRouteHandler } from './handler'

export type ServerInfoHandler = (ctx: {
    session: string | undefined
}) => MaybePromise<ServerInfoModel>

export const createDefaultServerInfoHandler =
    (sonolus: SonolusBase): ServerInfoHandler =>
    () => ({
        title: sonolus.title,
        description: sonolus.description,
        buttons: [
            { type: 'post' },
            { type: 'playlist' },
            { type: 'level' },
            { type: 'replay' },
            { type: 'skin' },
            { type: 'background' },
            { type: 'effect' },
            { type: 'particle' },
            { type: 'engine' },
        ],
        banner: sonolus.banner,
    })

export const createServerInfoRouteHandler =
    (sonolus: SonolusBase): SonolusRouteHandler =>
    async ({ res, localize, session }) => {
        res.json(toServerInfo(await sonolus.serverInfoHandler({ session }), localize))
    }
