import Ajv, { JTDSchemaType } from 'ajv/dist/jtd'
import { DB } from './db'

export type Ordering = {
    [type in keyof DB]?: string[]
}

export const orderingSchema: JTDSchemaType<Ordering> = {
    optionalProperties: {
        levels: { elements: { type: 'string' } },
        skins: { elements: { type: 'string' } },
        backgrounds: { elements: { type: 'string' } },
        effects: { elements: { type: 'string' } },
        particles: { elements: { type: 'string' } },
        engines: { elements: { type: 'string' } },
    },
}

export const orderingParser = new Ajv().compileParser(orderingSchema)
