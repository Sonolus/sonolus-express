import { Database, LocalizationText, Section, ServerInfo } from 'sonolus-core'
import {
    SearchInfo,
    toBackgroundItem,
    toEffectItem,
    toEngineItem,
    toLevelItem,
    toParticleItem,
    toSearch,
    toSkinItem,
} from '.'
import { ToItem } from './item'
import { toReplayItem } from './replay-item'

export const toServerInfo = (
    serverInfo: Database,
    db: Database,
    localize: (text: LocalizationText) => string,
    levelsSearch: SearchInfo,
    skinsSearch: SearchInfo,
    backgroundsSearch: SearchInfo,
    effectsSearch: SearchInfo,
    particlesSearch: SearchInfo,
    enginesSearch: SearchInfo,
    replaysSearch: SearchInfo,
): ServerInfo => ({
    title: localize(serverInfo.info.title),
    banner: serverInfo.info.banner,
    levels: toSection(db, localize, serverInfo.levels, toLevelItem, levelsSearch),
    skins: toSection(db, localize, serverInfo.skins, toSkinItem, skinsSearch),
    backgrounds: toSection(
        db,
        localize,
        serverInfo.backgrounds,
        toBackgroundItem,
        backgroundsSearch,
    ),
    effects: toSection(db, localize, serverInfo.effects, toEffectItem, effectsSearch),
    particles: toSection(db, localize, serverInfo.particles, toParticleItem, particlesSearch),
    engines: toSection(db, localize, serverInfo.engines, toEngineItem, enginesSearch),
    replays: toSection(db, localize, serverInfo.replays, toReplayItem, replaysSearch),
})

const toSection = <T, U>(
    db: Database,
    localize: (text: LocalizationText) => string,
    infos: T[],
    toItem: ToItem<T, U>,
    search: SearchInfo,
): Section<U> => ({
    items: infos.map((info) => toItem(db, localize, info)),
    search: toSearch(localize, search),
})
