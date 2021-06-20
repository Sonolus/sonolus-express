import { JTDSchemaType } from 'ajv/dist/jtd'
import { LocalizationText, localizationTextSchema } from './localization-text'
import { getSRLSchema, SRL } from './srl'

export interface BackgroundInfo {
    name: string
    version: number
    title: LocalizationText
    subtitle: LocalizationText
    author: LocalizationText
    description: LocalizationText
    thumbnail: SRL<'BackgroundThumbnail'>
    data: SRL<'BackgroundData'>
    image: SRL<'BackgroundImage'>
}

export const backgroundInfoSchema: JTDSchemaType<BackgroundInfo> = {
    properties: {
        name: { type: 'string' },
        version: { type: 'uint32' },
        title: localizationTextSchema,
        subtitle: localizationTextSchema,
        author: localizationTextSchema,
        description: localizationTextSchema,
        thumbnail: getSRLSchema('BackgroundThumbnail'),
        data: getSRLSchema('BackgroundData'),
        image: getSRLSchema('BackgroundImage'),
    },
}
