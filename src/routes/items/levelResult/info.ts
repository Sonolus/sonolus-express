import { ServerFormsModel } from '../../../models/server/forms/form.js'
import {
    ServerLevelResultInfoModel,
    toServerLevelResultInfo,
} from '../../../models/server/items/levelResult/info.js'
import { ServerOptionsModel } from '../../../models/server/options/option.js'
import { SonolusLevelResult } from '../../../sonolus/levelResult.js'
import { SonolusCtx } from '../../ctx.js'
import { handleError } from '../../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../../handler.js'

export type ServerLevelResultInfoHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TSubmits extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions>,
) => HandlerResponse<ServerLevelResultInfoModel<TSubmits>, 401>

export const createDefaultServerLevelResultInfoHandler =
    <TConfigurationOptions extends ServerOptionsModel, TSubmits extends ServerFormsModel>(
        levelResult: SonolusLevelResult<TConfigurationOptions, TSubmits>,
    ): ServerLevelResultInfoHandler<TConfigurationOptions, TSubmits> =>
    () => ({
        submits: levelResult.submits,
    })

export const createServerLevelResultInfoRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel, TSubmits extends ServerFormsModel>(
        levelResult: SonolusLevelResult<TConfigurationOptions, TSubmits>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ res, localize, ctx }) => {
        const response = await levelResult.infoHandler(ctx)
        if (handleError(response, res, localize)) return

        res.json(toServerLevelResultInfo(localize, response, levelResult.submits))
    }
