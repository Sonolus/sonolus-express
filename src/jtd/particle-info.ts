import { JTDSchemaType } from 'ajv/dist/jtd'
import { LocalizationText, localizationTextSchema } from './localization-text'
import { getSRLSchema, SRL } from './srl'

export interface ParticleInfo {
    name: string
    version: number
    title: LocalizationText
    subtitle: LocalizationText
    author: LocalizationText
    description: LocalizationText
    thumbnail: SRL<'ParticleThumbnail'>
    data: SRL<'ParticleData'>
    texture: SRL<'ParticleTexture'>
}

export const particleInfoSchema: JTDSchemaType<ParticleInfo> = {
    properties: {
        name: { type: 'string' },
        version: { type: 'uint32' },
        title: localizationTextSchema,
        subtitle: localizationTextSchema,
        author: localizationTextSchema,
        description: localizationTextSchema,
        thumbnail: getSRLSchema('ParticleThumbnail'),
        data: getSRLSchema('ParticleData'),
        texture: getSRLSchema('ParticleTexture'),
    },
}
