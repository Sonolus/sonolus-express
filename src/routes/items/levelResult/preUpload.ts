import { ServerFormsModel } from '../../../models/server/forms/form.js'
import { ServerOptionsModel } from '../../../models/server/options/option.js'
import { SonolusLevelResult } from '../../../sonolus/levelResult.js'
import { extractString } from '../../../utils/extract.js'
import { SonolusCtx } from '../../ctx.js'
import { handleError } from '../../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../../handler.js'

export type ServerPreUploadLevelResultHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        key: string
    },
) => HandlerResponse<true, 400 | 401>

export const createServerPreUploadLevelResultRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel, TSubmits extends ServerFormsModel>(
        levelResult: SonolusLevelResult<TConfigurationOptions, TSubmits>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, next, localize, ctx }) => {
        if (!levelResult.preUploadHandler) {
            res.status(404).end()
            return
        }

        const key = extractString(req.headers['sonolus-upload-key'])
        if (key === undefined) {
            res.status(400).end()
            return
        }

        const response = await levelResult.preUploadHandler({ ...ctx, key })
        if (handleError(response, res, localize)) return

        next()
    }
