import { Type } from '@sinclair/typebox'
import { EngineItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { tagSchema } from '../../tag.js'
import { SchemaToMatch } from '../../test.js'
import { backgroundItemSchema } from './background.js'
import { effectItemSchema } from './effect.js'
import { particleItemSchema } from './particle.js'
import { skinItemSchema } from './skin.js'

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
