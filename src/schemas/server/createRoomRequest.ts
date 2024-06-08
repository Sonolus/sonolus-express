import { Type } from '@sinclair/typebox'
import { CreateRoomRequest } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'

export const createRoomRequestSchema = Type.Object({})

type _Tests = Expect<[SchemaToMatch<typeof createRoomRequestSchema, CreateRoomRequest>]>
