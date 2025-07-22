import { ServerUploadLevelResultResponse } from '@sonolus/core'
import { ServerFormsModel } from '../../../models/server/forms/form.js'
import { ServerOptionsModel } from '../../../models/server/options/option.js'
import { SonolusLevelResult } from '../../../sonolus/levelResult.js'
import { extractString } from '../../../utils/extract.js'
import { SonolusCtx } from '../../ctx.js'
import { handleError } from '../../error.js'
import { HandlerResponse, SonolusRouteHandler } from '../../handler.js'

export type ServerUploadLevelResultHandler<TConfigurationOptions extends ServerOptionsModel> = (
    ctx: SonolusCtx<TConfigurationOptions> & {
        key: string
        files: Express.Multer.File[]
    },
) => HandlerResponse<ServerUploadLevelResultResponse, 400 | 401>

export const createServerUploadLevelResultRouteHandler =
    <TConfigurationOptions extends ServerOptionsModel, TSubmits extends ServerFormsModel>(
        levelResult: SonolusLevelResult<TConfigurationOptions, TSubmits>,
    ): SonolusRouteHandler<TConfigurationOptions> =>
    async ({ req, res, localize, ctx }) => {
        if (!levelResult.uploadHandler) {
            res.status(404).end()
            return
        }

        const key = extractString(req.headers['sonolus-upload-key'])
        if (key === undefined) {
            res.status(400).end()
            return
        }

        const files = req.files
        if (!Array.isArray(files)) {
            res.status(400).end()
            return
        }

        const response = await levelResult.uploadHandler({ ...ctx, key, files })
        if (handleError(response, res, localize)) return

        res.json(response)
    }
