import { ServerLevelResultInfo } from '@sonolus/core'
import { Localize } from '../../../../utils/localization.js'
import { PickForms, ServerFormsModel, toServerForms } from '../../forms/form.js'

export type ServerLevelResultInfoModel<TSubmits extends ServerFormsModel> = {
    submits?: PickForms<TSubmits>
}

export const toServerLevelResultInfo = <TSubmits extends ServerFormsModel>(
    localize: Localize,
    info: ServerLevelResultInfoModel<TSubmits>,
    submits: TSubmits,
): ServerLevelResultInfo => ({
    submits: info.submits && toServerForms(localize, info.submits, submits),
})
