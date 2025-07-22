import { ServerFormsModel } from '../models/server/forms/form.js'
import { ServerOptionsModel } from '../models/server/options/option.js'
import { SonolusRouteHandler } from '../routes/handler.js'
import {
    ServerCreateRoomHandler,
    createServerCreateRoomRouteHandler,
} from '../routes/multiplayer/create.js'
import {
    ServerJoinRoomHandler,
    createServerJoinRoomRouteHandler,
} from '../routes/multiplayer/join.js'
import { SonolusBase } from './base.js'

export class SonolusMultiplayer<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel,
> {
    private readonly _getCreates: () => TCreates

    createHandler?: ServerCreateRoomHandler<TConfigurationOptions>

    joinHandler?: ServerJoinRoomHandler<TConfigurationOptions, TCreates>

    private readonly _createRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _joinRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    constructor(sonolus: SonolusBase, getCreates: () => TCreates) {
        this._getCreates = getCreates

        this._createRouteHandler = createServerCreateRoomRouteHandler(this)

        this._joinRouteHandler = createServerJoinRoomRouteHandler(sonolus, this)
    }

    get creates(): TCreates {
        return this._getCreates()
    }
}
