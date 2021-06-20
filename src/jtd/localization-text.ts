import { JTDSchemaType } from 'ajv/dist/jtd'

export type LocalizationText = Record<string, string>

export const localizationTextSchema: JTDSchemaType<LocalizationText> = {
    values: { type: 'string' },
}
