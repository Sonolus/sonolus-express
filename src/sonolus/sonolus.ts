import { LocalizationText, Srl, localize, hash as sonolusHash, version } from '@sonolus/core'
import express, { NextFunction, Request, RequestHandler, Response, Router } from 'express'
import multer from 'multer'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ServerFormsModel } from '../models/forms/form'
import { parseOptionsQuery } from '../models/forms/query'
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
import { ServerOptionsModel } from '../models/options/option'
import {
    AuthenticateHandler,
    createAuthenticateRouteHandler,
    defaultAuthenticateHandler,
} from '../routes/authentication'
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
import { SessionHandler, defaultSessionHandler } from './session'

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

    sessionHandler: SessionHandler<TConfigurationOptions>
    authenticateHandler: AuthenticateHandler<TConfigurationOptions>

    serverInfoHandler: ServerInfoHandler<TConfigurationOptions>

    readonly multiplayer: SonolusMultiplayer<TConfigurationOptions, TRoomCreates>

    readonly post!: SonolusItemGroup<
        TConfigurationOptions,
        PostItemModel,
        TPostCreates,
        TPostSearches,
        TPostCommunityActions
    >
    readonly playlist!: SonolusItemGroup<
        TConfigurationOptions,
        PlaylistItemModel,
        TPlaylistCreates,
        TPlaylistSearches,
        TPlaylistCommunityActions
    >
    readonly level!: SonolusItemGroup<
        TConfigurationOptions,
        LevelItemModel,
        TLevelCreates,
        TLevelSearches,
        TLevelCommunityActions
    >
    readonly skin!: SonolusItemGroup<
        TConfigurationOptions,
        SkinItemModel,
        TSkinCreates,
        TSkinSearches,
        TSkinCommunityActions
    >
    readonly background!: SonolusItemGroup<
        TConfigurationOptions,
        BackgroundItemModel,
        TBackgroundCreates,
        TBackgroundSearches,
        TBackgroundCommunityActions
    >
    readonly effect!: SonolusItemGroup<
        TConfigurationOptions,
        EffectItemModel,
        TEffectCreates,
        TEffectSearches,
        TEffectCommunityActions
    >
    readonly particle!: SonolusItemGroup<
        TConfigurationOptions,
        ParticleItemModel,
        TParticleCreates,
        TParticleSearches,
        TParticleCommunityActions
    >
    readonly engine!: SonolusItemGroup<
        TConfigurationOptions,
        EngineItemModel,
        TEngineCreates,
        TEngineSearches,
        TEngineCommunityActions
    >
    readonly replay!: SonolusItemGroup<
        TConfigurationOptions,
        ReplayItemModel,
        TReplayCreates,
        TReplaySearches,
        TReplayCommunityActions
    >
    readonly room!: SonolusItemGroup<
        TConfigurationOptions,
        RoomItemModel,
        TRoomCreates,
        TRoomSearches,
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

            post?: SonolusItemGroupOptions<TPostCreates, TPostSearches, TPostCommunityActions>
            playlist?: SonolusItemGroupOptions<
                TPlaylistCreates,
                TPlaylistSearches,
                TPlaylistCommunityActions
            >
            level?: SonolusItemGroupOptions<TLevelCreates, TLevelSearches, TLevelCommunityActions>
            skin?: SonolusItemGroupOptions<TSkinCreates, TSkinSearches, TSkinCommunityActions>
            background?: SonolusItemGroupOptions<
                TBackgroundCreates,
                TBackgroundSearches,
                TBackgroundCommunityActions
            >
            effect?: SonolusItemGroupOptions<
                TEffectCreates,
                TEffectSearches,
                TEffectCommunityActions
            >
            particle?: SonolusItemGroupOptions<
                TParticleCreates,
                TParticleSearches,
                TParticleCommunityActions
            >
            engine?: SonolusItemGroupOptions<
                TEngineCreates,
                TEngineSearches,
                TEngineCommunityActions
            >
            replay?: SonolusItemGroupOptions<
                TReplayCreates,
                TReplaySearches,
                TReplayCommunityActions
            >
            room?: SonolusItemGroupOptions<TRoomCreates, TRoomSearches, TRoomCommunityActions>
        } = {},
    ) {
        this.address = options.address
        this.fallbackLocale = options.fallbackLocale ?? 'en'
        this.configuration = {
            options: options.configuration?.options ?? ({} as never),
        }

        this.router = express.Router()

        this.title = {}

        this.sessionHandler = defaultSessionHandler
        this.authenticateHandler = defaultAuthenticateHandler

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

        this._post('/authenticate', createAuthenticateRouteHandler(this))

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

                const options = parseOptionsQuery(req.query, this.configuration.options)

                const session = extractString(req.headers['sonolus-session'])
                if (!(await this.sessionHandler({ session, localization, options }))) {
                    res.status(401).end()
                    return
                }

                await handler({ req, res, next, localize, ctx: { session, localization, options } })
            } catch (error) {
                console.error(error)
                res.status(500).end()
            }
        }
    }
}
