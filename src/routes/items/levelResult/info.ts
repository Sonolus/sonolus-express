import { ServerLevelResultInfoModel } from '../../../models'
import { ServerFormsModel } from '../../../models/server/forms/form'
import { toServerLevelResultInfo } from '../../../models/server/items/levelResult/info'
import { ServerOptionsModel } from '../../../models/server/options/option'
import { SonolusLevelResult } from '../../../sonolus/levelResult'
import { SonolusCtx } from '../../ctx'
import { handleError } from '../../error'
import { HandlerResponse, SonolusRouteHandler } from '../../handler'

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
