import { ServerFormsModel } from '../models/server/forms/form'
import { ServerOptionsModel } from '../models/server/options/option'
import { SonolusRouteHandler } from '../routes/handler'
import {
    ServerCreateRoomHandler,
    createServerCreateRoomRouteHandler,
    defaultServerCreateRoomHandler,
} from '../routes/multiplayer/create'
import {
    ServerJoinRoomHandler,
    createServerJoinRoomRouteHandler,
    defaultServerJoinRoomHandler,
} from '../routes/multiplayer/join'
import { SonolusBase } from './base'

export class SonolusMultiplayer<
    TConfigurationOptions extends ServerOptionsModel,
    TCreates extends ServerFormsModel | undefined,
> {
    private readonly _getCreates: () => TCreates

    createHandler: ServerCreateRoomHandler<TConfigurationOptions>

    joinHandler: ServerJoinRoomHandler<TConfigurationOptions, TCreates>

    private readonly _createRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    private readonly _joinRouteHandler: SonolusRouteHandler<TConfigurationOptions>

    constructor(sonolus: SonolusBase, getCreates: () => TCreates) {
        this._getCreates = getCreates

        this.createHandler = defaultServerCreateRoomHandler

        this.joinHandler = defaultServerJoinRoomHandler

        this._createRouteHandler = createServerCreateRoomRouteHandler(this)

        this._joinRouteHandler = createServerJoinRoomRouteHandler(sonolus, this)
    }

    get creates(): TCreates {
        return this._getCreates()
    }
}
