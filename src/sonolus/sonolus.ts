import { LocalizationText, Srl, localize, hash as sonolusHash, version } from '@sonolus/core'
import express, { NextFunction, Request, RequestHandler, Response, Router } from 'express'
import multer from 'multer'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { BackgroundItemModel, toBackgroundItem } from '../models/items/background'
import { EffectItemModel, toEffectItem } from '../models/items/effect'
import { EngineItemModel, toEngineItem } from '../models/items/engine'
import { LevelItemModel, toLevelItem } from '../models/items/level'
import { ParticleItemModel, toParticleItem } from '../models/items/particle'
import { PlaylistItemModel, toPlaylistItem } from '../models/items/playlist'
import { PostItemModel, toPostItem } from '../models/items/post'
import { ReplayItemModel, toReplayItem } from '../models/items/replay'
import { RoomItemModel, toRoomItem } from '../models/items/room'
import { SkinItemModel, toSkinItem } from '../models/items/skin'
import { ServerFormsModel } from '../models/server/forms/form'
import { ServerOptionsModel } from '../models/server/options/option'
import { parseRawServerOptionsValue, parseServerOptionsValue } from '../models/server/options/value'
import {
    ServerAuthenticateHandler,
    createServerAuthenticateRouteHandler,
} from '../routes/authenticate'
import { SonolusRouteHandler } from '../routes/handler'
import {
    ServerInfoHandler,
    createDefaultServerInfoHandler,
    createServerInfoRouteHandler,
} from '../routes/info'
import { filterBackgrounds } from '../routes/items/filters/background'
import { filterEffects } from '../routes/items/filters/effect'
import { filterEngines } from '../routes/items/filters/engine'
import { filterLevels } from '../routes/items/filters/level'
import { filterParticles } from '../routes/items/filters/particle'
import { filterPlaylists } from '../routes/items/filters/playlist'
import { filterPosts } from '../routes/items/filters/post'
import { filterReplays } from '../routes/items/filters/replay'
import { filterRooms } from '../routes/items/filters/room'
import { filterSkins } from '../routes/items/filters/skin'
import { databaseSchema } from '../schemas/database/database'
import { extractString } from '../utils/extract'
import { parse } from '../utils/json'
import { Localize } from '../utils/localization'
import { SonolusItemGroup, SonolusItemGroupOptions } from './itemGroup'
import { SonolusMultiplayer } from './multiplayer'
import { SessionHandler } from './session'

const itemTypes = [
    ['post', 'posts', toPostItem, filterPosts],
    ['playlist', 'playlists', toPlaylistItem, filterPlaylists],
    ['level', 'levels', toLevelItem, filterLevels],
    ['skin', 'skins', toSkinItem, filterSkins],
    ['background', 'backgrounds', toBackgroundItem, filterBackgrounds],
    ['effect', 'effects', toEffectItem, filterEffects],
    ['particle', 'particles', toParticleItem, filterParticles],
    ['engine', 'engines', toEngineItem, filterEngines],
    ['replay', 'replays', toReplayItem, filterReplays],
    ['room', 'rooms', toRoomItem, filterRooms],
] as const

export type UploadOptions = {
    options?: multer.Options
    maxCount?: number
}

export class Sonolus<
    TConfigurationOptions extends ServerOptionsModel = {},
    TPostCreates extends ServerFormsModel | undefined = undefined,
    TPlaylistCreates extends ServerFormsModel | undefined = undefined,
    TLevelCreates extends ServerFormsModel | undefined = undefined,
    TSkinCreates extends ServerFormsModel | undefined = undefined,
    TBackgroundCreates extends ServerFormsModel | undefined = undefined,
    TEffectCreates extends ServerFormsModel | undefined = undefined,
    TParticleCreates extends ServerFormsModel | undefined = undefined,
    TEngineCreates extends ServerFormsModel | undefined = undefined,
    TReplayCreates extends ServerFormsModel | undefined = undefined,
    TRoomCreates extends ServerFormsModel | undefined = undefined,
    TPostSearches extends ServerFormsModel = {},
    TPlaylistSearches extends ServerFormsModel = {},
    TLevelSearches extends ServerFormsModel = {},
    TSkinSearches extends ServerFormsModel = {},
    TBackgroundSearches extends ServerFormsModel = {},
    TEffectSearches extends ServerFormsModel = {},
    TParticleSearches extends ServerFormsModel = {},
    TEngineSearches extends ServerFormsModel = {},
    TReplaySearches extends ServerFormsModel = {},
    TRoomSearches extends ServerFormsModel = {},
    TPostActions extends ServerFormsModel = {},
    TPlaylistActions extends ServerFormsModel = {},
    TLevelActions extends ServerFormsModel = {},
    TSkinActions extends ServerFormsModel = {},
    TBackgroundActions extends ServerFormsModel = {},
    TEffectActions extends ServerFormsModel = {},
    TParticleActions extends ServerFormsModel = {},
    TEngineActions extends ServerFormsModel = {},
    TReplayActions extends ServerFormsModel = {},
    TRoomActions extends ServerFormsModel = {},
    TPostCommunityActions extends ServerFormsModel = {},
    TPlaylistCommunityActions extends ServerFormsModel = {},
    TLevelCommunityActions extends ServerFormsModel = {},
    TSkinCommunityActions extends ServerFormsModel = {},
    TBackgroundCommunityActions extends ServerFormsModel = {},
    TEffectCommunityActions extends ServerFormsModel = {},
    TParticleCommunityActions extends ServerFormsModel = {},
    TEngineCommunityActions extends ServerFormsModel = {},
    TReplayCommunityActions extends ServerFormsModel = {},
    TRoomCommunityActions extends ServerFormsModel = {},
> {
    readonly address?: string
    readonly fallbackLocale: string
    readonly configuration: {
        options: TConfigurationOptions
    }

    readonly router: Router

    title: LocalizationText
    description?: LocalizationText
    banner?: Srl

    sessionHandler?: SessionHandler<TConfigurationOptions>
    authenticateHandler?: ServerAuthenticateHandler<TConfigurationOptions>

    serverInfoHandler: ServerInfoHandler<TConfigurationOptions>

    readonly multiplayer: SonolusMultiplayer<TConfigurationOptions, TRoomCreates>

    readonly post!: SonolusItemGroup<
        TConfigurationOptions,
        PostItemModel,
        TPostCreates,
        TPostSearches,
        TPostActions,
        TPostCommunityActions
    >
    readonly playlist!: SonolusItemGroup<
        TConfigurationOptions,
        PlaylistItemModel,
        TPlaylistCreates,
        TPlaylistSearches,
        TPlaylistActions,
        TPlaylistCommunityActions
    >
    readonly level!: SonolusItemGroup<
        TConfigurationOptions,
        LevelItemModel,
        TLevelCreates,
        TLevelSearches,
        TLevelActions,
        TLevelCommunityActions
    >
    readonly skin!: SonolusItemGroup<
        TConfigurationOptions,
        SkinItemModel,
        TSkinCreates,
        TSkinSearches,
        TSkinActions,
        TSkinCommunityActions
    >
    readonly background!: SonolusItemGroup<
        TConfigurationOptions,
        BackgroundItemModel,
        TBackgroundCreates,
        TBackgroundSearches,
        TBackgroundActions,
        TBackgroundCommunityActions
    >
    readonly effect!: SonolusItemGroup<
        TConfigurationOptions,
        EffectItemModel,
        TEffectCreates,
        TEffectSearches,
        TEffectActions,
        TEffectCommunityActions
    >
    readonly particle!: SonolusItemGroup<
        TConfigurationOptions,
        ParticleItemModel,
        TParticleCreates,
        TParticleSearches,
        TParticleActions,
        TParticleCommunityActions
    >
    readonly engine!: SonolusItemGroup<
        TConfigurationOptions,
        EngineItemModel,
        TEngineCreates,
        TEngineSearches,
        TEngineActions,
        TEngineCommunityActions
    >
    readonly replay!: SonolusItemGroup<
        TConfigurationOptions,
        ReplayItemModel,
        TReplayCreates,
        TReplaySearches,
        TReplayActions,
        TReplayCommunityActions
    >
    readonly room!: SonolusItemGroup<
        TConfigurationOptions,
        RoomItemModel,
        TRoomCreates,
        TRoomSearches,
        TRoomActions,
        TRoomCommunityActions
    >

    constructor(
        options: {
            address?: string
            fallbackLocale?: string
            configuration?: {
                options: TConfigurationOptions
            }
            upload?: UploadOptions

            post?: SonolusItemGroupOptions<
                TPostCreates,
                TPostSearches,
                TPostActions,
                TPostCommunityActions
            >
            playlist?: SonolusItemGroupOptions<
                TPlaylistCreates,
                TPlaylistSearches,
                TPlaylistActions,
                TPlaylistCommunityActions
            >
            level?: SonolusItemGroupOptions<
                TLevelCreates,
                TLevelSearches,
                TLevelActions,
                TLevelCommunityActions
            >
            skin?: SonolusItemGroupOptions<
                TSkinCreates,
                TSkinSearches,
                TSkinActions,
                TSkinCommunityActions
            >
            background?: SonolusItemGroupOptions<
                TBackgroundCreates,
                TBackgroundSearches,
                TBackgroundActions,
                TBackgroundCommunityActions
            >
            effect?: SonolusItemGroupOptions<
                TEffectCreates,
                TEffectSearches,
                TEffectActions,
                TEffectCommunityActions
            >
            particle?: SonolusItemGroupOptions<
                TParticleCreates,
                TParticleSearches,
                TParticleActions,
                TParticleCommunityActions
            >
            engine?: SonolusItemGroupOptions<
                TEngineCreates,
                TEngineSearches,
                TEngineActions,
                TEngineCommunityActions
            >
            replay?: SonolusItemGroupOptions<
                TReplayCreates,
                TReplaySearches,
                TReplayActions,
                TReplayCommunityActions
            >
            room?: SonolusItemGroupOptions<
                TRoomCreates,
                TRoomSearches,
                TRoomActions,
                TRoomCommunityActions
            >
        } = {},
    ) {
        this.address = options.address
        this.fallbackLocale = options.fallbackLocale ?? 'en'
        this.configuration = {
            options: options.configuration?.options ?? ({} as never),
        }

        this.router = express.Router()

        this.title = {}

        this.serverInfoHandler = createDefaultServerInfoHandler(this)

        this.multiplayer = new SonolusMultiplayer(this, () => this.room.creates)

        for (const [type, , toItem, filter] of itemTypes) {
            this[type] = new SonolusItemGroup(
                this,
                type,
                options[type as never],
                toItem as never,
                filter as never,
            ) as never
        }

        this._installRoutes(options.upload ?? {})
    }

    load(path: string): void {
        const dbPath = resolve(path, 'db.json')
        const repositoryPath = resolve(path, 'repository')

        const db = parse(readFileSync(dbPath, 'utf8'), databaseSchema)
        if (!db) throw new Error(`Invalid database: path=${dbPath}`)

        this.title = db.info.title
        if (db.info.description) this.description = db.info.description
        if (db.info.banner) this.banner = db.info.banner

        this.post.items.push(...db.posts)
        this.playlist.items.push(...db.playlists)
        this.level.items.push(...db.levels)
        this.skin.items.push(...db.skins)
        this.background.items.push(...db.backgrounds)
        this.effect.items.push(...db.effects)
        this.particle.items.push(...db.particles)
        this.engine.items.push(...db.engines)
        this.replay.items.push(...db.replays)

        this.router.use('/sonolus/repository', express.static(repositoryPath))
    }

    add(data: Buffer | string, hash?: string): Srl {
        hash ??= sonolusHash(typeof data === 'string' ? readFileSync(data) : data)

        const url = `/sonolus/repository/${hash}`

        if (typeof data === 'string') {
            const path = resolve(data)
            this.router.get(url, (req, res) => {
                res.sendFile(path)
            })
        } else {
            this.router.get(url, (req, res) => {
                res.send(data)
            })
        }

        return { hash, url }
    }

    localize(text: LocalizationText, locale: string): string {
        return localize(text, locale, this.fallbackLocale)
    }

    private _installRoutes(upload: UploadOptions) {
        const uploader = multer(upload.options).array('files', upload.maxCount)

        this._post('/authenticate', createServerAuthenticateRouteHandler(this))

        this._get('/info', createServerInfoRouteHandler(this))

        this._post('/rooms/create', this.multiplayer['_createRouteHandler'])

        this._post('/rooms/:itemName', this.multiplayer['_joinRouteHandler'])

        for (const [type, path] of itemTypes) {
            this._get(`/${path}/info`, this[type]['_infoRouteHandler'])

            this._get(`/${path}/list`, this[type]['_listRouteHandler'])

            this._post(`/${path}/create`, this[type]['_createRouteHandler'])
            this._upload(
                `/${path}/upload`,
                this[type]['_preUploadRouteHandler'],
                uploader,
                this[type]['_uploadRouteHandler'],
            )

            this._get(`/${path}/:itemName`, this[type]['_detailsRouteHandler'])

            this._post(`/${path}/:itemName/submit`, this[type]['_submitActionRouteHandler'])
            this._upload(
                `/${path}/:itemName/upload`,
                this[type]['_preUploadActionRouteHandler'],
                uploader,
                this[type]['_uploadActionRouteHandler'],
            )

            this._get(`/${path}/:itemName/community/info`, this[type]['_communityInfoRouteHandler'])

            this._post(
                `/${path}/:itemName/community/submit`,
                this[type]['_communitySubmitRouteHandler'],
            )
            this._upload(
                `/${path}/:itemName/community/upload`,
                this[type]['_communityPreUploadRouteHandler'],
                uploader,
                this[type]['_communityUploadRouteHandler'],
            )

            this._get(
                `/${path}/:itemName/community/comments/list`,
                this[type]['_communityCommentListRouteHandler'],
            )

            this._post(
                `/${path}/:itemName/community/comments/:commentName/submit`,
                this[type]['_communityCommentSubmitRouteHandler'],
            )
            this._upload(
                `/${path}/:itemName/community/comments/:commentName/upload`,
                this[type]['_communityCommentPreUploadRouteHandler'],
                uploader,
                this[type]['_communityCommentUploadRouteHandler'],
            )

            this._get(
                `/${path}/:itemName/leaderboards/:leaderboardName`,
                this[type]['_leaderboardDetailsRouteHandler'],
            )

            this._get(
                `/${path}/:itemName/leaderboards/:leaderboardName/records/list`,
                this[type]['_leaderboardRecordListRouteHandler'],
            )

            this._get(
                `/${path}/:itemName/leaderboards/:leaderboardName/records/:recordName`,
                this[type]['_leaderboardRecordDetailsRouteHandler'],
            )
        }
    }

    private _get(path: string, handler: SonolusRouteHandler<TConfigurationOptions>) {
        this.router.get(`/sonolus${path}`, this._toMiddleware(handler))
    }

    private _post(path: string, handler: SonolusRouteHandler<TConfigurationOptions>) {
        this.router.post(
            `/sonolus${path}`,
            express.raw({ type: 'application/json' }),
            this._toMiddleware(handler),
        )
    }

    private _upload(
        path: string,
        preHandler: SonolusRouteHandler<TConfigurationOptions>,
        uploader: RequestHandler,
        handler: SonolusRouteHandler<TConfigurationOptions>,
    ) {
        this.router.post(
            `/sonolus${path}`,
            this._toMiddleware(preHandler),
            uploader,
            this._toMiddleware(handler),
        )
    }

    private _toMiddleware(handler: SonolusRouteHandler<TConfigurationOptions>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.set('Sonolus-Version', version.sonolus)

                const localization = extractString(req.query.localization) ?? ''
                const localize: Localize = (text) => this.localize(text, localization)

                const options = parseServerOptionsValue(req.query, this.configuration.options)
                const rawOptions = parseRawServerOptionsValue(req.query, this.configuration.options)

                const session = extractString(req.headers['sonolus-session'])

                const ctx = { session, localization, options, rawOptions }

                if (this.sessionHandler) {
                    const result = await this.sessionHandler(ctx)
                    if (typeof result === 'number') {
                        res.status(result).end()
                        return
                    }
                }

                await handler({ req, res, next, localize, ctx })
            } catch (error) {
                console.error(error)
                res.status(500).end()
            }
        }
    }
}
