import Type from 'typebox'

import { MutuallyAssignable } from '../utils/test.js'

export type SchemaToMatch<A extends Type.TSchema, B> = MutuallyAssignable<Type.Static<A>, B>
