import { LocalizationText, Srl, localize, hash as sonolusHash, version } from '@sonolus/core'
import express, { NextFunction, Request, RequestHandler, Response, Router } from 'express'
import multer from 'multer'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { BackgroundItemModel, toBackgroundItem } from '../models/items/background.js'
import { EffectItemModel, toEffectItem } from '../models/items/effect.js'
import { EngineItemModel, toEngineItem } from '../models/items/engine.js'
import { LevelItemModel, toLevelItem } from '../models/items/level.js'
import { ParticleItemModel, toParticleItem } from '../models/items/particle.js'
import { PlaylistItemModel, toPlaylistItem } from '../models/items/playlist.js'
import { PostItemModel, toPostItem } from '../models/items/post.js'
import { ReplayItemModel, toReplayItem } from '../models/items/replay.js'
import { RoomItemModel, toRoomItem } from '../models/items/room.js'
import { SkinItemModel, toSkinItem } from '../models/items/skin.js'
import { ServerFormsModel } from '../models/server/forms/form.js'
import { ServerOptionsModel } from '../models/server/options/option.js'
import {
    parseRawServerOptionsValue,
    parseServerOptionsValue,
} from '../models/server/options/value.js'
import {
    ServerAuthenticateHandler,
    createServerAuthenticateRouteHandler,
} from '../routes/authenticate.js'
import { handleError } from '../routes/error.js'
import { SonolusRouteHandler } from '../routes/handler.js'
import {
    ServerInfoHandler,
    createDefaultServerInfoHandler,
    createServerInfoRouteHandler,
} from '../routes/info.js'
import { filterBackgrounds } from '../routes/items/filters/background.js'
import { filterEffects } from '../routes/items/filters/effect.js'
import { filterEngines } from '../routes/items/filters/engine.js'
import { filterLevels } from '../routes/items/filters/level.js'
import { filterParticles } from '../routes/items/filters/particle.js'
import { filterPlaylists } from '../routes/items/filters/playlist.js'
import { filterPosts } from '../routes/items/filters/post.js'
import { filterReplays } from '../routes/items/filters/replay.js'
import { filterRooms } from '../routes/items/filters/room.js'
import { filterSkins } from '../routes/items/filters/skin.js'
import { databaseSchema } from '../schemas/database/database.js'
import { extractString } from '../utils/extract.js'
import { parse } from '../utils/json.js'
import { Localize } from '../utils/localization.js'
import { SonolusItemGroup, SonolusItemGroupOptions } from './itemGroup.js'
import { SonolusLevelResult, SonolusLevelResultOptions } from './levelResult.js'
import { SonolusMultiplayer } from './multiplayer.js'
import { SessionHandler } from './session.js'

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
    TPostCreates extends ServerFormsModel = {},
    TPlaylistCreates extends ServerFormsModel = {},
    TLevelCreates extends ServerFormsModel = {},
    TSkinCreates extends ServerFormsModel = {},
    TBackgroundCreates extends ServerFormsModel = {},
    TEffectCreates extends ServerFormsModel = {},
    TParticleCreates extends ServerFormsModel = {},
    TEngineCreates extends ServerFormsModel = {},
    TReplayCreates extends ServerFormsModel = {},
    TRoomCreates extends ServerFormsModel = {},
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
    TPostCommunityCommentActions extends ServerFormsModel = {},
    TPlaylistCommunityCommentActions extends ServerFormsModel = {},
    TLevelCommunityCommentActions extends ServerFormsModel = {},
    TSkinCommunityCommentActions extends ServerFormsModel = {},
    TBackgroundCommunityCommentActions extends ServerFormsModel = {},
    TEffectCommunityCommentActions extends ServerFormsModel = {},
    TParticleCommunityCommentActions extends ServerFormsModel = {},
    TEngineCommunityCommentActions extends ServerFormsModel = {},
    TReplayCommunityCommentActions extends ServerFormsModel = {},
    TRoomCommunityCommentActions extends ServerFormsModel = {},
    TLevelResultSubmits extends ServerFormsModel = {},
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

    readonly levelResult: SonolusLevelResult<TConfigurationOptions, TLevelResultSubmits>

    readonly post!: SonolusItemGroup<
        TConfigurationOptions,
        PostItemModel,
        TPostCreates,
        TPostSearches,
        TPostActions,
        TPostCommunityActions,
        TPostCommunityCommentActions
    >
    readonly playlist!: SonolusItemGroup<
        TConfigurationOptions,
        PlaylistItemModel,
        TPlaylistCreates,
        TPlaylistSearches,
        TPlaylistActions,
        TPlaylistCommunityActions,
        TPlaylistCommunityCommentActions
    >
    readonly level!: SonolusItemGroup<
        TConfigurationOptions,
        LevelItemModel,
        TLevelCreates,
        TLevelSearches,
        TLevelActions,
        TLevelCommunityActions,
        TLevelCommunityCommentActions
    >
    readonly skin!: SonolusItemGroup<
        TConfigurationOptions,
        SkinItemModel,
        TSkinCreates,
        TSkinSearches,
        TSkinActions,
        TSkinCommunityActions,
        TSkinCommunityCommentActions
    >
    readonly background!: SonolusItemGroup<
        TConfigurationOptions,
        BackgroundItemModel,
        TBackgroundCreates,
        TBackgroundSearches,
        TBackgroundActions,
        TBackgroundCommunityActions,
        TBackgroundCommunityCommentActions
    >
    readonly effect!: SonolusItemGroup<
        TConfigurationOptions,
        EffectItemModel,
        TEffectCreates,
        TEffectSearches,
        TEffectActions,
        TEffectCommunityActions,
        TEffectCommunityCommentActions
    >
    readonly particle!: SonolusItemGroup<
        TConfigurationOptions,
        ParticleItemModel,
        TParticleCreates,
        TParticleSearches,
        TParticleActions,
        TParticleCommunityActions,
        TParticleCommunityCommentActions
    >
    readonly engine!: SonolusItemGroup<
        TConfigurationOptions,
        EngineItemModel,
        TEngineCreates,
        TEngineSearches,
        TEngineActions,
        TEngineCommunityActions,
        TEngineCommunityCommentActions
    >
    readonly replay!: SonolusItemGroup<
        TConfigurationOptions,
        ReplayItemModel,
        TReplayCreates,
        TReplaySearches,
        TReplayActions,
        TReplayCommunityActions,
        TReplayCommunityCommentActions
    >
    readonly room!: SonolusItemGroup<
        TConfigurationOptions,
        RoomItemModel,
        TRoomCreates,
        TRoomSearches,
        TRoomActions,
        TRoomCommunityActions,
        TRoomCommunityCommentActions
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
                TPostCommunityActions,
                TPostCommunityCommentActions
            >
            playlist?: SonolusItemGroupOptions<
                TPlaylistCreates,
                TPlaylistSearches,
                TPlaylistActions,
                TPlaylistCommunityActions,
                TPlaylistCommunityCommentActions
            >
            level?: SonolusItemGroupOptions<
                TLevelCreates,
                TLevelSearches,
                TLevelActions,
                TLevelCommunityActions,
                TLevelCommunityCommentActions
            >
            skin?: SonolusItemGroupOptions<
                TSkinCreates,
                TSkinSearches,
                TSkinActions,
                TSkinCommunityActions,
                TSkinCommunityCommentActions
            >
            background?: SonolusItemGroupOptions<
                TBackgroundCreates,
                TBackgroundSearches,
                TBackgroundActions,
                TBackgroundCommunityActions,
                TBackgroundCommunityCommentActions
            >
            effect?: SonolusItemGroupOptions<
                TEffectCreates,
                TEffectSearches,
                TEffectActions,
                TEffectCommunityActions,
                TEffectCommunityCommentActions
            >
            particle?: SonolusItemGroupOptions<
                TParticleCreates,
                TParticleSearches,
                TParticleActions,
                TParticleCommunityActions,
                TParticleCommunityCommentActions
            >
            engine?: SonolusItemGroupOptions<
                TEngineCreates,
                TEngineSearches,
                TEngineActions,
                TEngineCommunityActions,
                TEngineCommunityCommentActions
            >
            replay?: SonolusItemGroupOptions<
                TReplayCreates,
                TReplaySearches,
                TReplayActions,
                TReplayCommunityActions,
                TReplayCommunityCommentActions
            >
            room?: SonolusItemGroupOptions<
                TRoomCreates,
                TRoomSearches,
                TRoomActions,
                TRoomCommunityActions,
                TRoomCommunityCommentActions
            >
            levelResult?: SonolusLevelResultOptions<TLevelResultSubmits>
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

        this.levelResult = new SonolusLevelResult(options.levelResult)

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

        this._get('/levels/result/info', this.levelResult['_infoRouteHandler'])

        this._post('/levels/result/submit', this.levelResult['_submitRouteHandler'])
        this._upload(
            '/levels/result/upload',
            this.levelResult['_preUploadRouteHandler'],
            uploader,
            this.levelResult['_uploadRouteHandler'],
        )

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
                    if (handleError(result, res, localize)) return
                }

                await handler({ req, res, next, localize, ctx })
            } catch (error) {
                console.error(error)
                res.status(500).end()
            }
        }
    }
}
