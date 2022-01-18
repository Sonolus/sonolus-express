import {
    Database,
    LocalizationText,
    OptionName,
    SearchOption,
} from 'sonolus-core'
import { SearchSelectOptionInfo } from './select'
import { SearchSliderOptionInfo } from './slider'
import { SearchTextOptionInfo } from './text'
import { SearchToggleOptionInfo } from './toggle'

export type SearchOptionInfo =
    | SearchTextOptionInfo
    | SearchSliderOptionInfo
    | SearchToggleOptionInfo
    | SearchSelectOptionInfo

export function toSearchOption(
    db: Database,
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchOptionInfo
): SearchOption {
    return {
        ...info,
        query,
        name: localize(info.name) as OptionName,
    }
}
