import { Static, TSchema } from '@sinclair/typebox'
import { MutuallyAssignable } from '../utils/test'

export type SchemaToMatch<A extends TSchema, B> = MutuallyAssignable<Static<A>, B>
