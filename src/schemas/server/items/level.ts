import { TSchema, Type } from '@sinclair/typebox'
import { LevelItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { tagSchema } from '../../tag.js'
import { SchemaToMatch } from '../../test.js'
import { backgroundItemSchema } from './background.js'
import { effectItemSchema } from './effect.js'
import { engineItemSchema } from './engine.js'
import { particleItemSchema } from './particle.js'
import { skinItemSchema } from './skin.js'

const useItemSchema = <T extends TSchema>(T: T) =>
    Type.Union([
        Type.Object({
            useDefault: Type.Literal(true),
        }),
        Type.Object({
            useDefault: Type.Literal(false),
            item: T,
        }),
    ])

export const levelItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(1),
    rating: Type.Number(),
    title: Type.String(),
    artists: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    engine: engineItemSchema,
    useSkin: useItemSchema(skinItemSchema),
    useBackground: useItemSchema(backgroundItemSchema),
    useEffect: useItemSchema(effectItemSchema),
    useParticle: useItemSchema(particleItemSchema),
    cover: srlSchema,
    bgm: srlSchema,
    preview: Type.Optional(srlSchema),
    data: srlSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof levelItemSchema, LevelItem>]>
