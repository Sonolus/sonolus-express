import { Icon, LocalizationText, ServerItemSection } from '@sonolus/core'
import { SonolusBase } from '../../sonolus/base'
import { Localize } from '../../utils/localization'
import { BackgroundItemModel, toBackgroundItem } from './background'
import { EffectItemModel, toEffectItem } from './effect'
import { EngineItemModel, toEngineItem } from './engine'
import { toItems } from './item'
import { LevelItemModel, toLevelItem } from './level'
import { ParticleItemModel, toParticleItem } from './particle'
import { PlaylistItemModel, toPlaylistItem } from './playlist'
import { PostItemModel, toPostItem } from './post'
import { ReplayItemModel, toReplayItem } from './replay'
import { RoomItemModel, toRoomItem } from './room'
import { SkinItemModel, toSkinItem } from './skin'

export type ItemSectionModel =
    | ItemSectionModelTyped<'post', PostItemModel>
    | ItemSectionModelTyped<'playlist', PlaylistItemModel>
    | ItemSectionModelTyped<'level', LevelItemModel>
    | ItemSectionModelTyped<'skin', SkinItemModel>
    | ItemSectionModelTyped<'background', BackgroundItemModel>
    | ItemSectionModelTyped<'effect', EffectItemModel>
    | ItemSectionModelTyped<'particle', ParticleItemModel>
    | ItemSectionModelTyped<'engine', EngineItemModel>
    | ItemSectionModelTyped<'replay', ReplayItemModel>
    | ItemSectionModelTyped<'room', RoomItemModel>

type ItemSectionModelTyped<TItemType, TItem> = {
    title: LocalizationText
    icon?: Icon
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

export const toItemSection = (
    sonolus: SonolusBase,
    localize: Localize,
    section: ItemSectionModel,
): ServerItemSection => ({
    title: localize(section.title),
    icon: section.icon,
    itemType: section.itemType,
    items: toItems(
        sonolus,
        localize,
        toItemByType[section.itemType] as never,
        section.items as never,
    ) as never,
})

export const toItemSections = (
    sonolus: SonolusBase,
    localize: Localize,
    sections: ItemSectionModel[],
): ServerItemSection[] => sections.map((section) => toItemSection(sonolus, localize, section))
