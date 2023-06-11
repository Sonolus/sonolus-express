import { Request, Response } from 'express'
import { InfoDetails, LocalizationText } from 'sonolus-core'
import { ItemsConfig, Sonolus } from '..'
import { toItemDetails } from '../../api'
import { ToItem } from '../../api/item'
import { Promisable } from '../../utils/types'

export type DetailsHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T,
> = (
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>,
    name: string,
) => Promisable<InfoDetails<T> | undefined>

export const defaultDetailsHandler = <
    T extends {
        name: string
        description: LocalizationText
    },
>(
    infos: T[],
    name: string,
): InfoDetails<T> | undefined => {
    const index = infos.findIndex((info) => info.name === name)
    if (index === -1) return undefined

    const info = infos[index]
    return {
        info,
        description: info.description,
        recommended: infos.slice(index + 1, index + 6),
    }
}

export const detailsRouteHandler = async <
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    T,
    U,
>(
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines>,
    handler: DetailsHandler<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, T>,
    toItem: ToItem<T, U>,
    req: Request,
    res: Response,
): Promise<void> => {
    const infoDetails = await handler(sonolus, req.params.name)
    if (!infoDetails) {
        res.status(404).end()
        return
    }

    res.json(toItemDetails(sonolus.db, req.localize, toItem, infoDetails))
}
