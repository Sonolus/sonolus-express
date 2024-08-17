import { LocalizationText, ServerMessage } from '@sonolus/core'
import { Response } from 'express'
import { Localize } from '../utils'

export type ServerError<E extends number> = E | [E, LocalizationText]

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const handleError = <T>(
    response: T | ServerError<number>,
    res: Response,
    localize: Localize,
): response is ServerError<number> => {
    if (typeof response === 'number') {
        res.status(response).end()
        return true
    }

    if (Array.isArray(response)) {
        const [code, text] = response
        const body: ServerMessage = {
            message: localize(text),
        }

        res.status(code).json(body)
        return true
    }

    return false
}
