import { ServerFormsModel } from '../models/server/forms/form'
import { ServerOptionsModel } from '../models/server/options/option'
import { SonolusRouteHandler } from '../routes/handler'
import {
    ServerCreateRoomHandler,
    createServerCreateRoomRouteHandler,
} from '../routes/multiplayer/create'
import { ServerJoinRoomHandler, createServerJoinRoomRouteHandler } from '../routes/multiplayer/join'
import { SonolusBase } from './base'

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
