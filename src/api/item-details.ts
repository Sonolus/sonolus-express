import { Database, InfoDetails, ItemDetails, LocalizationText } from 'sonolus-core'
import { ToItem } from './item'

export const toItemDetails = <T, U>(
    db: Database,
    localize: (text: LocalizationText) => string,
    toItem: ToItem<T, U>,
    infoDetails: InfoDetails<T>,
): ItemDetails<U> => ({
    item: toItem(db, localize, infoDetails.info),
    description: localize(infoDetails.description),
    recommended: infoDetails.recommended.map((info) => toItem(db, localize, info)),
})
