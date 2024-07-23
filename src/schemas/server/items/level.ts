import { TSchema, Type } from '@sinclair/typebox'
import { LevelItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'
import { backgroundItemSchema } from './background'
import { effectItemSchema } from './effect'
import { engineItemSchema } from './engine'
import { particleItemSchema } from './particle'
import { skinItemSchema } from './skin'

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
