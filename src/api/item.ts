import { Database, LocalizationText } from 'sonolus-core'

export type ToItem<T, U> = (
    db: Database,
    localize: (text: LocalizationText) => string,
    info: T
) => U
