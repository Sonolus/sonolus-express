import { Database, LocalizationText, ServerInfo } from 'sonolus-core'
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

export function toServerInfo(
    serverInfo: Database,
    db: Database,
    localize: (text: LocalizationText) => string,
    levelsSearch: SearchInfo,
    skinsSearch: SearchInfo,
    backgroundsSearch: SearchInfo,
    effectsSearch: SearchInfo,
    particlesSearch: SearchInfo,
    enginesSearch: SearchInfo,
): ServerInfo {
    return {
        title: localize(serverInfo.info.title),
        banner: serverInfo.info.banner,
        levels: {
            items: serverInfo.levels.map((info) => toLevelItem(db, localize, info)),
            search: toSearch(localize, levelsSearch),
        },
        skins: {
            items: serverInfo.skins.map((info) => toSkinItem(db, localize, info)),
            search: toSearch(localize, skinsSearch),
        },
        backgrounds: {
            items: serverInfo.backgrounds.map((info) => toBackgroundItem(db, localize, info)),
            search: toSearch(localize, backgroundsSearch),
        },
        effects: {
            items: serverInfo.effects.map((info) => toEffectItem(db, localize, info)),
            search: toSearch(localize, effectsSearch),
        },
        particles: {
            items: serverInfo.particles.map((info) => toParticleItem(db, localize, info)),
            search: toSearch(localize, particlesSearch),
        },
        engines: {
            items: serverInfo.engines.map((info) => toEngineItem(db, localize, info)),
            search: toSearch(localize, enginesSearch),
        },
    }
}
