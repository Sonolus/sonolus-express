import { ServerInfoModel, toServerInfo } from '../models/info'
import { optionsTypes, ServerOptionsModel } from '../models/options/option'
import { SonolusBase } from '../sonolus/base'
import { Sonolus } from '../sonolus/sonolus'
import { MaybePromise } from '../utils/promise'
import { SonolusCtx, SonolusRouteHandler } from './handler'

export type ServerInfoHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => MaybePromise<ServerInfoModel<TConfigurationOptions>>

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
            options: optionsTypes(sonolus.configuration.options),
        },
        banner: sonolus.banner,
    })

export const createServerInfoRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel>(
        sonolus: SonolusBase &
            Pick<Sonolus<TConfigurationOptions>, 'configuration' | 'serverInfoHandler'>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ res, localize, ctx }) => {
        res.json(
            toServerInfo(
                localize,
                await sonolus.serverInfoHandler(ctx),
                sonolus.configuration.options,
            ),
        )
    }
