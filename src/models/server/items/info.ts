import { LocalizationText, ServerItemInfo, Srl } from '@sonolus/core'
import { SonolusBase } from '../../../sonolus/base.js'
import { Localize } from '../../../utils/localization.js'
import { PickForms, ServerFormsModel, toServerForms } from '../../server/forms/form.js'
import { ServerItemSectionModel, toServerItemSections } from '../../server/items/section.js'
import { RawServerFormValue, serializeRawServerFormsValue } from '../forms/value.js'

export type ServerItemInfoModel<
    TCreates extends ServerFormsModel,
    TSearches extends ServerFormsModel,
> = {
    title?: LocalizationText
    creates?: PickForms<TCreates>
    searches?: PickForms<TSearches>
    quickSearchValue?: {
        [K in keyof TSearches]: RawServerFormValue<K & string, TSearches[K]>
    }[keyof TSearches]
    sections: ServerItemSectionModel<TSearches>[]
    banner?: Srl
}

export const toServerItemInfo = <
    TCreates extends ServerFormsModel,
    TSearches extends ServerFormsModel,
>(
    sonolus: SonolusBase,
    localize: Localize,
    info: ServerItemInfoModel<TCreates, TSearches>,
    creates: TCreates,
    searches: TSearches,
): ServerItemInfo => ({
    title: info.title && localize(info.title),
    creates: info.creates && toServerForms(localize, info.creates, creates),
    searches: info.searches && toServerForms(localize, info.searches, searches),
    quickSearchValues:
        info.quickSearchValue && serializeRawServerFormsValue(info.quickSearchValue, searches),
    sections: toServerItemSections(sonolus, localize, info.sections, searches),
    banner: info.banner,
})
