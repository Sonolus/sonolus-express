import { ServerItemInfo, Srl } from '@sonolus/core'
import { SonolusBase } from '../../../sonolus/base'
import { Localize } from '../../../utils/localization'
import { ServerFormsModel, toServerForms } from '../../server/forms/form'
import { ServerItemSectionModel, toServerItemSections } from '../../server/items/section'

export type ServerItemInfoModel<
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
> = {
    creates?: (keyof NonNullable<TCreates> & string)[]
    searches?: (keyof TSearches & string)[]
    sections: ServerItemSectionModel<TSearches>[]
    banner?: Srl
}

export const toServerItemInfo = <
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
>(
    sonolus: SonolusBase,
    localize: Localize,
    info: ServerItemInfoModel<TCreates, TSearches>,
    creates: TCreates,
    searches: TSearches,
): ServerItemInfo => ({
    creates: creates && info.creates && toServerForms(localize, info.creates, creates),
    searches: info.searches && toServerForms(localize, info.searches, searches),
    sections: toServerItemSections(sonolus, localize, info.sections, searches),
    banner: info.banner,
})
