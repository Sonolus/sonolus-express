import { TSchema } from '@sinclair/typebox'
import { SchemaToMatch } from '../../test.js'

export type DatabaseItemSchemaToMatch<A extends TSchema, B> = SchemaToMatch<
    A,
    B & { meta?: unknown }
>
