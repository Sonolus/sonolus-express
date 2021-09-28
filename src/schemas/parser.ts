import { ZodError } from 'zod'

export type Parser<T> = (data: unknown, logPath: string) => T

export function getParser<T>(schema: {
    parse: (data: unknown) => T
}): Parser<T> {
    return (data, logPath) => {
        try {
            return schema.parse(data)
        } catch (error) {
            if (!(error instanceof ZodError)) throw `${logPath}: ${error}`

            const messages = error.issues.map(({ message, path }) =>
                path.length > 0 ? `${message} (${formatPath(path)})` : message
            )
            throw [`${logPath}:`, ...messages].join(
                messages.length > 1 ? '\n' : ' '
            )
        }
    }
}

function formatPath(path: (string | number)[]) {
    return path
        .map((segment) => {
            switch (typeof segment) {
                case 'string':
                    return `.${segment}`
                case 'number':
                    return `[${segment}]`
            }
        })
        .join('')
}
