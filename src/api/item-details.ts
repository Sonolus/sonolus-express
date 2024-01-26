import { ItemDetails, LocalizationText } from 'sonolus-core'
import { SonolusBase } from '../core/sonolus'
import { ToItem } from './item'
import { ItemSectionModel, toItemSections } from './item-section'
import { Localize } from './localization'

export type ItemDetailsModel<T> = {
    item: T
    description: LocalizationText
    sections: ItemSectionModel<T>[]
}

export const toItemDetails = <T, U>(
    sonolus: SonolusBase,
    localize: Localize,
    toItem: ToItem<T, U>,
    details: ItemDetailsModel<T>,
): ItemDetails<U> => ({
    item: toItem(sonolus, localize, details.item),
    description: localize(details.description),
    sections: toItemSections(sonolus, localize, toItem, details.sections),
})
