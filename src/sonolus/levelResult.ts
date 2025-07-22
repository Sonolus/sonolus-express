import { ServerFormsModel } from '../models/server/forms/form.js'
import { ServerOptionsModel } from '../models/server/options/option.js'
import { SonolusRouteHandler } from '../routes/handler.js'
import {
    createDefaultServerLevelResultInfoHandler,
    createServerLevelResultInfoRouteHandler,
    ServerLevelResultInfoHandler,
} from '../routes/items/levelResult/info.js'
import {
    createServerPreUploadLevelResultRouteHandler,
    ServerPreUploadLevelResultHandler,
} from '../routes/items/levelResult/preUpload.js'
import {
    createServerSubmitLevelResultRouteHandler,
    ServerSubmitLevelResultHandler,
} from '../routes/items/levelResult/submit.js'
import {
    createServerUploadLevelResultRouteHandler,
    ServerUploadLevelResultHandler,
} from '../routes/items/levelResult/upload.js'

export type SonolusLevelResultOptions<TSubmits extends ServerFormsModel> = {
    submits?: TSubmits
}

export class SonolusLevelResult<
    TConfigurationOptions extends ServerOptionsModel,
    TSubmits extends ServerFormsModel,
> {
    submits: TSubmits

    infoHandler: ServerLevelResultInfoHandler<TConfigurationOptions, TSubmits>

    submitHandler?: ServerSubmitLevelResultHandler<TConfigurationOptions, TSubmits>
    preUploadHandler?: ServerPreUploadLevelResultHandler<TConfigurationOptions>
    uploadHandler?: ServerUploadLevelResultHandler<TConfigurationOptions>

    private readonly _infoRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _submitRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _preUploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>
    private readonly _uploadRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    constructor(options: SonolusLevelResultOptions<TSubmits> = {}) {
        this.submits = options.submits ?? ({} as never)

        this.infoHandler = createDefaultServerLevelResultInfoHandler(this)

        this._infoRouteHandler = createServerLevelResultInfoRouteHandler(this)

        this._submitRouteHandler = createServerSubmitLevelResultRouteHandler(this)
        this._preUploadRouteHandler = createServerPreUploadLevelResultRouteHandler(this)
        this._uploadRouteHandler = createServerUploadLevelResultRouteHandler(this)
    }
}
