import { ServerInfoModel, toServerInfo } from '../models/server/info'
import { ServerOptionsModel } from '../models/server/options/option'
import { SonolusBase } from '../sonolus/base'
import { Sonolus } from '../sonolus/sonolus'
import { MaybePromise } from '../utils/promise'
import { SonolusCtx } from './ctx'
import { SonolusRouteHandler } from './handler'

export type ServerInfoHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => MaybePromise<ServerInfoModel<TConfigurationOptions> | 401>

export const createDefaultServerInfoHandler =
    <TConfigurationOptions extends ServerOptionsModel>(
        sonolus: SonolusBase & Pick<Sonolus<TConfigurationOptions>, 'configuration'>,
    ): ServerInfoHandler<TConfigurationOptions> =>
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
            { type: 'configuration' },
        ],
        configuration: {
            options: sonolus.configuration.options,
        },
        banner: sonolus.banner,
    })

export const createServerInfoRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel>(
        sonolus: SonolusBase &
            Pick<Sonolus<TConfigurationOptions>, 'configuration' | 'serverInfoHandler'>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ res, localize, ctx }) => {
        const response = await sonolus.serverInfoHandler(ctx)
        if (typeof response === 'number') {
            res.status(response).end()
            return
        }

        res.json(toServerInfo(localize, response, sonolus.configuration.options))
    }
