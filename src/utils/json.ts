import Type from 'typebox'
import Value from 'typebox/value'

export const parse = <T extends Type.TSchema>(
    json: Buffer | string,
    schema: T,
): Type.Static<T> | undefined => {
    try {
        const value: unknown = JSON.parse(typeof json === 'string' ? json : json.toString('utf8'))
        if (!Value.Check(schema, value)) return

        Value.Clean(schema, value)
        return value
    } catch {
        return
    }
}
