export type ResourceType =
    | 'LevelCover'
    | 'LevelBgm'
    | 'LevelData'
    | 'SkinThumbnail'
    | 'SkinData'
    | 'SkinTexture'
    | 'BackgroundThumbnail'
    | 'BackgroundData'
    | 'BackgroundImage'
    | 'BackgroundConfiguration'
    | 'EffectThumbnail'
    | 'EffectData'
    | 'EffectClip'
    | 'ParticleThumbnail'
    | 'ParticleData'
    | 'ParticleTexture'
    | 'EngineThumbnail'
    | 'EngineData'
    | 'EngineConfiguration'

export type SRL<T extends ResourceType> = {
    type: T
    hash: string
    url: string
}

type SRLSchema<T extends ResourceType> = {
    properties: {
        type: { enum: T[] }
        hash: { type: 'string' }
        url: { type: 'string' }
    }
}

export function getSRLSchema<T extends ResourceType>(type: T): SRLSchema<T> {
    return {
        properties: {
            type: { enum: [type] },
            hash: { type: 'string' },
            url: { type: 'string' },
        },
    }
}
