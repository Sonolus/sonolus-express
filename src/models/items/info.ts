import { ServerItemInfo, Srl } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'
import { ServerFormsModel, toServerForms } from '../forms/form'
import { ItemSectionModel, toItemSections } from './section'

export type ItemInfoModel<
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
> = {
    creates?: (keyof NonNullable<TCreates> & string)[]
    searches?: (keyof TSearches & string)[]
    sections: ItemSectionModel[]
    banner?: Srl
}

export const toItemInfo = <
    TCreates extends ServerFormsModel | undefined,
    TSearches extends ServerFormsModel,
>(
    sonolus: SonolusBase,
    localize: Localize,
    info: ItemInfoModel<TCreates, TSearches>,
    creates: TCreates,
    searches: TSearches,
): ServerItemInfo => ({
    creates: creates && info.creates && toServerForms(localize, info.creates, creates),
    searches: info.searches && toServerForms(localize, info.searches, searches),
    sections: toItemSections(sonolus, localize, info.sections),
    banner: info.banner,
})
