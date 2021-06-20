import { DB } from '../jtd/db'
import { InfoDetails } from '../jtd/info-details'
import { LocalizationText } from '../jtd/localization-text'

export type ItemDetails<T> = {
    item: T
    description: string
    recommended: T[]
}

export function toItemDetails<T, U>(
    db: DB,
    localize: (text: LocalizationText) => string,
    toItem: (
        db: DB,
        localize: (text: LocalizationText) => string,
        info: T
    ) => U,
    infoDetails: InfoDetails<T>
): ItemDetails<U> {
    return {
        item: toItem(db, localize, infoDetails.info),
        description: localize(infoDetails.description),
        recommended: infoDetails.recommended.map((info) =>
            toItem(db, localize, info)
        ),
    }
}
