import { ReplayItem, ServerSubmitLevelResultResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../../models/server/forms/form'
import { ServerFormsValue, parseServerFormsValue } from '../../../models/server/forms/value'
import { ServerOptionsModel } from '../../../models/server/options/option'
import { serverSubmitLevelResultRequestSchema } from '../../../schemas/server/items/levelResult/submit'
import { SonolusLevelResult } from '../../../sonolus/levelResult'
import { parse } from '../../../utils/json'
import { SonolusCtx } from '../../ctx'
import { handleError } from '../../error'
import { HandlerResponse, SonolusRouteHandler } from '../../handler'

export type ServerSubmitLevelResultHandler<
    TConfigurationOptions extends ServerOptionsModel,
    TSubmits extends ServerFormsModel,
> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        replay: ReplayItem
        value: ServerFormsValue<TSubmits>
    },
) => HandlerResponse<ServerSubmitLevelResultResponse, 400 | 401>

export const createServerSubmitLevelResultRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel, TSubmits extends ServerFormsModel>(
        levelResult: SonolusLevelResult<TConfigurationOptions, TSubmits>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        if (!levelResult.submitHandler) {
            res.status(404).end()
            return
        }

        const body: unknown = req.body
        if (!(body instanceof Buffer)) {
            res.status(400).end()
            return
        }

        const request = parse(body, serverSubmitLevelResultRequestSchema)
        if (!request) {
            res.status(400).end()
            return
        }

        const value = parseServerFormsValue(
            Object.fromEntries(new URLSearchParams(request.values)),
            levelResult.submits,
        )
        if (!value) {
            res.status(400).end()
            return
        }

        const response = await levelResult.submitHandler({ ...ctx, replay: request.replay, value })
        if (handleError(response, res, localize)) return

        res.json(response)
    }
