import { ZodError } from 'zod'

export type Parser<T> = (data: unknown, logPath: string) => T

export const getParser =
    <T>(schema: { parse: (data: unknown) => T }): Parser<T> =>
    (data, logPath) => {
        try {
            return schema.parse(data)
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            if (!(error instanceof ZodError)) throw new Error(`${logPath}: ${error}`)

            const messages = error.issues.map(({ message, path }) =>
                path.length > 0 ? `${message} (${formatPath(path)})` : message,
            )
            throw new Error([`${logPath}:`, ...messages].join(messages.length > 1 ? '\n' : ' '))
        }
    }

const formatPath = (path: (string | number)[]) =>
    path.map((segment) => (typeof segment === 'number' ? `[${segment}]` : `.${segment}`)).join('')
