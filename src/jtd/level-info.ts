import { JTDSchemaType } from 'ajv/dist/jtd'
import { LocalizationText, localizationTextSchema } from './localization-text'
import { getSRLSchema, SRL } from './srl'

export type Use = {
    useDefault: boolean
    item?: string
}

const useSchema: JTDSchemaType<Use> = {
    properties: {
        useDefault: { type: 'boolean' },
    },
    optionalProperties: {
        item: { type: 'string' },
    },
}

export interface LevelInfo {
    name: string
    version: number
    rating: number
    engine: string
    useSkin: Use
    useBackground: Use
    useEffect: Use
    useParticle: Use
    title: LocalizationText
    artists: LocalizationText
    author: LocalizationText
    description: LocalizationText
    cover: SRL<'LevelCover'>
    bgm: SRL<'LevelBgm'>
    data: SRL<'LevelData'>
}

export const levelInfoSchema: JTDSchemaType<LevelInfo> = {
    properties: {
        name: { type: 'string' },
        version: { type: 'uint32' },
        rating: { type: 'float32' },
        engine: { type: 'string' },
        useSkin: useSchema,
        useBackground: useSchema,
        useEffect: useSchema,
        useParticle: useSchema,
        title: localizationTextSchema,
        artists: localizationTextSchema,
        author: localizationTextSchema,
        description: localizationTextSchema,
        cover: getSRLSchema('LevelCover'),
        bgm: getSRLSchema('LevelBgm'),
        data: getSRLSchema('LevelData'),
    },
}
