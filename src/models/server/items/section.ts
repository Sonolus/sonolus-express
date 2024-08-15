import { Icon, LocalizationText, ServerItemSection } from '@sonolus/core'
import { SonolusBase } from '../../../sonolus/base'
import { Localize } from '../../../utils/localization'
import { BackgroundItemModel, toBackgroundItem } from '../../items/background'
import { EffectItemModel, toEffectItem } from '../../items/effect'
import { EngineItemModel, toEngineItem } from '../../items/engine'
import { toItems } from '../../items/item'
import { LevelItemModel, toLevelItem } from '../../items/level'
import { ParticleItemModel, toParticleItem } from '../../items/particle'
import { PlaylistItemModel, toPlaylistItem } from '../../items/playlist'
import { PostItemModel, toPostItem } from '../../items/post'
import { ReplayItemModel, toReplayItem } from '../../items/replay'
import { RoomItemModel, toRoomItem } from '../../items/room'
import { SkinItemModel, toSkinItem } from '../../items/skin'
import { ServerFormsModel, toServerForm } from '../forms/form'
import { RawServerFormValue, serializeRawServerFormsValue } from '../forms/value'

export type ServerItemSectionModel<T extends ServerFormsModel> = (
    | ServerItemSectionModelTyped<'post', PostItemModel>
    | ServerItemSectionModelTyped<'playlist', PlaylistItemModel>
    | ServerItemSectionModelTyped<'level', LevelItemModel>
    | ServerItemSectionModelTyped<'skin', SkinItemModel>
    | ServerItemSectionModelTyped<'background', BackgroundItemModel>
    | ServerItemSectionModelTyped<'effect', EffectItemModel>
    | ServerItemSectionModelTyped<'particle', ParticleItemModel>
    | ServerItemSectionModelTyped<'engine', EngineItemModel>
    | ServerItemSectionModelTyped<'replay', ReplayItemModel>
    | ServerItemSectionModelTyped<'room', RoomItemModel>
) & {
    search?: {
        [K in keyof T]: {
            value: RawServerFormValue<K & string, T[K]>
            form?: boolean | T[K]
        }
    }[keyof T]
}

type ServerItemSectionModelTyped<TItemType, TItem> = {
    title: LocalizationText
    icon?: Icon
    description?: LocalizationText
    help?: LocalizationText
    itemType: TItemType
    items: TItem[]
}

const toItemByType = {
    post: toPostItem,
    playlist: toPlaylistItem,
    level: toLevelItem,
    skin: toSkinItem,
    background: toBackgroundItem,
    effect: toEffectItem,
    particle: toParticleItem,
    engine: toEngineItem,
    replay: toReplayItem,
    room: toRoomItem,
}

export const toServerItemSection = <T extends ServerFormsModel>(
    sonolus: SonolusBase,
    localize: Localize,
    section: ServerItemSectionModel<T>,
    searches: T,
): ServerItemSection => ({
    title: localize(section.title),
    icon: section.icon,
    description: section.description && localize(section.description),
    help: section.help && localize(section.help),
    itemType: section.itemType,
    items: toItems(
        sonolus,
        localize,
        toItemByType[section.itemType] as never,
        section.items as never,
    ) as never,
    search: section.search?.form
        ? toServerForm(
              localize,
              section.search.value.type,
              section.search.form === true
                  ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    searches[section.search.value.type]!
                  : section.search.form,
          )
        : undefined,
    searchValues: section.search && serializeRawServerFormsValue(section.search.value, searches),
})

export const toServerItemSections = <T extends ServerFormsModel>(
    sonolus: SonolusBase,
    localize: Localize,
    sections: ServerItemSectionModel<T>[],
    searches: T,
): ServerItemSection[] =>
    sections.map((section) => toServerItemSection(sonolus, localize, section, searches))
