import { Type } from '@sinclair/typebox'
import { ServerCreateRoomRequest } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { SchemaToMatch } from '../../test'

export const serverCreateRoomRequestSchema = Type.Object({})

type _Tests = Expect<[SchemaToMatch<typeof serverCreateRoomRequestSchema, ServerCreateRoomRequest>]>
