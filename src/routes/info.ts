import { ServerInfoModel, toServerInfo } from '../models/server/info.js'
import { ServerOptionsModel } from '../models/server/options/option.js'
import { SonolusBase } from '../sonolus/base.js'
import { Sonolus } from '../sonolus/sonolus.js'
import { SonolusCtx } from './ctx.js'
import { handleError } from './error.js'
import { HandlerResponse, SonolusRouteHandler } from './handler.js'

export type ServerInfoHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => HandlerResponse<ServerInfoModel<TConfigurationOptions>, 401>

export const createDefaultServerInfoHandler =
    <TConfigurationOptions extends ServerOptionsModel>(
        sonolus: SonolusBase & Pick<Sonolus<TConfigurationOptions>, 'configuration'>,
    ): ServerInfoHandler<TConfigurationOptions> =>
    () => ({
        title: sonolus.title,
        description: sonolus.description,
        buttons: [
            ...(
                [
                    'post',
                    'playlist',
                    'level',
                    'replay',
                    'skin',
                    'background',
                    'effect',
                    'particle',
                    'engine',
                ] as const
            )
                .filter((type) => sonolus[type].items.length)
                .map((type) => ({ type })),
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
        if (handleError(response, res, localize)) return

        res.json(toServerInfo(localize, response, sonolus.configuration.options))
    }
