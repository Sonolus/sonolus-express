import { LocalizationText } from './localization-text'

export type InfoDetails<T> = {
    info: T
    description: LocalizationText
    recommended: T[]
}
