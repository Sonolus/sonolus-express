import { JTDSchemaType } from 'ajv/dist/jtd'
import { LocalizationText, localizationTextSchema } from './localization-text'
import { getSRLSchema, SRL } from './srl'

export interface SkinInfo {
    name: string
    version: number
    title: LocalizationText
    subtitle: LocalizationText
    author: LocalizationText
    description: LocalizationText
    thumbnail: SRL<'SkinThumbnail'>
    data: SRL<'SkinData'>
    texture: SRL<'SkinTexture'>
}

export const skinInfoSchema: JTDSchemaType<SkinInfo> = {
    properties: {
        name: { type: 'string' },
        version: { type: 'uint32' },
        title: localizationTextSchema,
        subtitle: localizationTextSchema,
        author: localizationTextSchema,
        description: localizationTextSchema,
        thumbnail: getSRLSchema('SkinThumbnail'),
        data: getSRLSchema('SkinData'),
        texture: getSRLSchema('SkinTexture'),
    },
}
