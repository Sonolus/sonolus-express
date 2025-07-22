import { ServerOptionsModel } from '../models/server/options/option.js'
import { RawServerOptionsValue, ServerOptionsValue } from '../models/server/options/value.js'

export type SonolusCtx<TConfigurationOptions extends ServerOptionsModel> = {
    session: string | undefined
    localization: string
    options: ServerOptionsValue<TConfigurationOptions>
    rawOptions: RawServerOptionsValue<TConfigurationOptions>
}
