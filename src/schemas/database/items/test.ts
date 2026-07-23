import Type from 'typebox'

import { SchemaToMatch } from '../../test.js'

export type DatabaseItemSchemaToMatch<A extends Type.TSchema, B> = SchemaToMatch<
    A,
    B & { meta?: unknown }
>
