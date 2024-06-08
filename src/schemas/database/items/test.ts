import { TSchema } from '@sinclair/typebox'
import { SchemaToMatch } from '../../test'

export type DatabaseItemSchemaToMatch<A extends TSchema, B> = SchemaToMatch<
    A,
    B & { meta?: unknown }
>
