import { Static, TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

export const parse = <T extends TSchema>(
    json: Buffer | string,
    schema: T,
): Static<T> | undefined => {
    try {
        const value: unknown = JSON.parse(typeof json === 'string' ? json : json.toString('utf8'))
        if (!Value.Check(schema, value)) return

        return Value.Clean(schema, value)
    } catch {
        return
    }
}
