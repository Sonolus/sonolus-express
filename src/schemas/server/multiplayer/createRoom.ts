import { Type } from '@sinclair/typebox'
import { ServerCreateRoomRequest } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { SchemaToMatch } from '../../test.js'

export const serverCreateRoomRequestSchema = Type.Object({})

type _Tests = Expect<[SchemaToMatch<typeof serverCreateRoomRequestSchema, ServerCreateRoomRequest>]>
