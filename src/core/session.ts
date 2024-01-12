import { SessionData } from 'sonolus-core'
import { Promisable } from '../utils/types'
import { ItemsConfig, Sonolus } from './sonolus'

export type CreateSessionHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
> = (
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, TReplays>,
    id: string,
    key: ArrayBuffer,
    iv: ArrayBuffer,
    expiration: number,
) => Promisable<void>

export type FindSessionHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
> = (
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, TReplays>,
    id: string,
) => Promisable<
    | {
          key: ArrayBuffer
          iv: ArrayBuffer
          expiration: number
      }
    | undefined
>

export type CheckSessionHandler<
    TLevels extends ItemsConfig,
    TSkins extends ItemsConfig,
    TBackgrounds extends ItemsConfig,
    TEffects extends ItemsConfig,
    TParticles extends ItemsConfig,
    TEngines extends ItemsConfig,
    TReplays extends ItemsConfig,
> = (
    sonolus: Sonolus<TLevels, TSkins, TBackgrounds, TEffects, TParticles, TEngines, TReplays>,
    id: string,
    data: SessionData,
) => Promisable<boolean>
