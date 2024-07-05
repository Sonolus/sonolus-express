import { ServerFormsModel } from '../models/forms/form'
import { ServerOptionsModel } from '../models/options/option'
import { SonolusRouteHandler } from '../routes/handler'
import {
    MultiplayerCreateHandler,
    createMultiplayerCreateRouteHandler,
    defaultMultiplayerCreateHandler,
} from '../routes/multiplayer/create'
import {
    MultiplayerJoinHandler,
    createMultiplayerJoinRouteHandler,
    defaultMultiplayerJoinHandler,
} from '../routes/multiplayer/join'
import { SonolusBase } from './base'

export class SonolusMultiplayer<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel | undefined,
> {
    private readonly _getCreates: () => TCreates

    createHandler: MultiplayerCreateHandler<TConfigurationOptions>

    joinHandler: MultiplayerJoinHandler<TConfigurationOptions, TCreates>

    private readonly _createRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _joinRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    constructor(sonolus: SonolusBase, getCreates: () => TCreates) {
        this._getCreates = getCreates

        this.createHandler = defaultMultiplayerCreateHandler

        this.joinHandler = defaultMultiplayerJoinHandler

        this._createRouteHandler = createMultiplayerCreateRouteHandler(this)

        this._joinRouteHandler = createMultiplayerJoinRouteHandler(sonolus, this)
    }

    get creates(): TCreates {
        return this._getCreates()
    }
}
