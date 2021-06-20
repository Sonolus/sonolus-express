import { JTDSchemaType } from 'ajv/dist/jtd'
import { LocalizationText, localizationTextSchema } from './localization-text'
import { getSRLSchema, SRL } from './srl'

export interface EngineInfo {
    name: string
    version: number
    title: LocalizationText
    subtitle: LocalizationText
    author: LocalizationText
    description: LocalizationText
    skin: string
    background: string
    effect: string
    particle: string
    thumbnail: SRL<'EngineThumbnail'>
    data: SRL<'EngineData'>
    configuration: SRL<'EngineConfiguration'>
}

export const engineInfoSchema: JTDSchemaType<EngineInfo> = {
    properties: {
        name: { type: 'string' },
        version: { type: 'uint32' },
        title: localizationTextSchema,
        subtitle: localizationTextSchema,
        author: localizationTextSchema,
        description: localizationTextSchema,
        skin: { type: 'string' },
        background: { type: 'string' },
        effect: { type: 'string' },
        particle: { type: 'string' },
        thumbnail: getSRLSchema('EngineThumbnail'),
        data: getSRLSchema('EngineData'),
        configuration: getSRLSchema('EngineConfiguration'),
    },
}
