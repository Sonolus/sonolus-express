import { Request, Response } from 'express'
import { InfoDetails, LocalizationText } from 'sonolus-core'
import { toItemDetails } from '../../api'
import { ToItem } from '../../api/item'
import { Promisable } from '../../utils/types'
import { Sonolus } from '../sonolus'

export type DetailsHandler<T> = (
    sonolus: Sonolus,
    name: string
) => Promisable<InfoDetails<T> | undefined>

export function defaultDetailsHandler<
    T extends {
        name: string
        description: LocalizationText
    }
>(infos: T[], name: string): InfoDetails<T> | undefined {
    const index = infos.findIndex((info) => info.name === name)
    if (index === -1) return undefined

    const info = infos[index]
    return {
        info,
        description: info.description,
        recommended: infos.slice(index + 1, index + 6),
    }
}

export async function detailsRouteHandler<T, U>(
    sonolus: Sonolus,
    handler: DetailsHandler<T>,
    toItem: ToItem<T, U>,
    req: Request,
    res: Response
): Promise<void> {
    const infoDetails = await handler(sonolus, req.params.name)
    if (!infoDetails) {
        res.status(404).end()
        return
    }

    res.json(toItemDetails(sonolus.db, req.localize, toItem, infoDetails))
}
