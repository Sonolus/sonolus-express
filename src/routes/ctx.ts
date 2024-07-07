import { ServerOptionsModel, ServerOptionsValue } from '../models'

export type SonolusCtx<TConfigurationOptions extends ServerOptionsModel> = {
    session: string | undefined
    localization: string
    options: ServerOptionsValue<TConfigurationOptions>
}
