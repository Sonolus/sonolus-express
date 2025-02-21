import { Type } from '@sinclair/typebox'
import { EngineItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'
import { backgroundItemSchema } from './background'
import { effectItemSchema } from './effect'
import { particleItemSchema } from './particle'
import { skinItemSchema } from './skin'

export const engineItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(13),
    title: Type.String(),
    subtitle: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    skin: skinItemSchema,
    background: backgroundItemSchema,
    effect: effectItemSchema,
    particle: particleItemSchema,
    thumbnail: srlSchema,
    playData: srlSchema,
    watchData: srlSchema,
    previewData: srlSchema,
    tutorialData: srlSchema,
    rom: Type.Optional(srlSchema),
    configuration: srlSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof engineItemSchema, EngineItem>]>
