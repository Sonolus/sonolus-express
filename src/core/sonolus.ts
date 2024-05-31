import {
    DatabaseServerInfo,
    LocalizationText,
    SRL,
    getSignaturePublicKey,
    localize,
    hash as sonolusHash,
    version,
} from '@sonolus/core'
import { webcrypto } from 'crypto'
import type { Express, Request, Response, Router } from 'express'
import * as express from 'express'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { ParsedQs } from 'qs'
import { BackgroundItemModel } from '../api/background-item'
import { EffectItemModel } from '../api/effect-item'
import { EngineItemModel } from '../api/engine-item'
import { ServerFormsModel } from '../api/form/form'
import { ParsedQuery, ParsedSearchQuery } from '../api/form/query'
import { LevelItemModel } from '../api/level-item'
import { ParticleItemModel } from '../api/particle-item'
import { PlaylistItemModel } from '../api/playlist-item'
import { PostItemModel } from '../api/post-item'
import { ReplayItemModel } from '../api/replay-item'
import { RoomItemModel } from '../api/room-item'
import { SkinItemModel } from '../api/skin-item'
import { authenticateServerRequestSchema } from '../schemas/authenticate-server-request'
import { databaseParser } from '../schemas/database'
import { safeJsonParse } from '../utils/safe-json-parse'
import { Promisable } from '../utils/types'
import {
    AuthenticateHandler,
    SessionHandler,
    defaultAuthenticateHandler,
    defaultSessionHandler,
} from './authentication'
import {
    CreateRoomHandler,
    JoinRoomHandler,
    createRoomRouteHandler,
    defaultCreateRoomHandler,
    defaultJoinRoomHandler,
    joinRoomRouteHandler,
} from './multiplayer'
import { ItemCommunityHandler, defaultItemCommunityHandler } from './routes'
import { backgroundCommunityRouteHandler } from './routes/backgrounds/community'
import { backgroundCommunityActionRouteHandler } from './routes/backgrounds/community-action'
import { backgroundCommunityCommentListRouteHandler } from './routes/backgrounds/community-comment-list'
import {
    backgroundDetailsRouteHandler,
    defaultBackgroundDetailsHandler,
} from './routes/backgrounds/details'
import { backgroundInfoRouteHandler, defaultBackgroundInfoHandler } from './routes/backgrounds/info'
import { backgroundListRouteHandler, defaultBackgroundListHandler } from './routes/backgrounds/list'
import { effectCommunityRouteHandler } from './routes/effects/community'
import { effectCommunityActionRouteHandler } from './routes/effects/community-action'
import { effectCommunityCommentListRouteHandler } from './routes/effects/community-comment-list'
import { defaultEffectDetailsHandler, effectDetailsRouteHandler } from './routes/effects/details'
import { defaultEffectInfoHandler, effectInfoRouteHandler } from './routes/effects/info'
import { defaultEffectListHandler, effectListRouteHandler } from './routes/effects/list'
import { engineCommunityRouteHandler } from './routes/engines/community'
import { engineCommunityActionRouteHandler } from './routes/engines/community-action'
import { engineCommunityCommentListRouteHandler } from './routes/engines/community-comment-list'
import { defaultEngineDetailsHandler, engineDetailsRouteHandler } from './routes/engines/details'
import { defaultEngineInfoHandler, engineInfoRouteHandler } from './routes/engines/info'
import { defaultEngineListHandler, engineListRouteHandler } from './routes/engines/list'
import {
    ItemCommunityActionHandler,
    defaultItemCommunityActionHandler,
} from './routes/item-community-action'
import {
    ItemCommunityCommentListHandler,
    defaultItemCommunityCommentListHandler,
} from './routes/item-community-comment-list'
import { ItemDetailsHandler } from './routes/item-details'
import { ItemInfoHandler } from './routes/item-info'
import { ItemListHandler } from './routes/item-list'
import { levelCommunityRouteHandler } from './routes/levels/community'
import { levelCommunityActionRouteHandler } from './routes/levels/community-action'
import { levelCommunityCommentListRouteHandler } from './routes/levels/community-comment-list'
import { defaultLevelDetailsHandler, levelDetailsRouteHandler } from './routes/levels/details'
import { defaultLevelInfoHandler, levelInfoRouteHandler } from './routes/levels/info'
import { defaultLevelListHandler, levelListRouteHandler } from './routes/levels/list'
import { particleCommunityRouteHandler } from './routes/particles/community'
import { particleCommunityActionRouteHandler } from './routes/particles/community-action'
import { particleCommunityCommentListRouteHandler } from './routes/particles/community-comment-list'
import {
    defaultParticleDetailsHandler,
    particleDetailsRouteHandler,
} from './routes/particles/details'
import { defaultParticleInfoHandler, particleInfoRouteHandler } from './routes/particles/info'
import { defaultParticleListHandler, particleListRouteHandler } from './routes/particles/list'
import { playlistCommunityRouteHandler } from './routes/playlists/community'
import { playlistCommunityActionRouteHandler } from './routes/playlists/community-action'
import { playlistCommunityCommentListRouteHandler } from './routes/playlists/community-comment-list'
import {
    defaultPlaylistDetailsHandler,
    playlistDetailsRouteHandler,
} from './routes/playlists/details'
import { defaultPlaylistInfoHandler, playlistInfoRouteHandler } from './routes/playlists/info'
import { defaultPlaylistListHandler, playlistListRouteHandler } from './routes/playlists/list'
import { postCommunityRouteHandler } from './routes/posts/community'
import { postCommunityActionRouteHandler } from './routes/posts/community-action'
import { postCommunityCommentListRouteHandler } from './routes/posts/community-comment-list'
import { defaultPostDetailsHandler, postDetailsRouteHandler } from './routes/posts/details'
import { defaultPostInfoHandler, postInfoRouteHandler } from './routes/posts/info'
import { defaultPostListHandler, postListRouteHandler } from './routes/posts/list'
import { replayCommunityRouteHandler } from './routes/replays/community'
import { replayCommunityActionRouteHandler } from './routes/replays/community-action'
import { replayCommunityCommentListRouteHandler } from './routes/replays/community-comment-list'
import { defaultReplayDetailsHandler, replayDetailsRouteHandler } from './routes/replays/details'
import { defaultReplayInfoHandler, replayInfoRouteHandler } from './routes/replays/info'
import { defaultReplayListHandler, replayListRouteHandler } from './routes/replays/list'
import { defaultRoomDetailsHandler } from './routes/rooms/details'
import { defaultRoomInfoHandler, roomInfoRouteHandler } from './routes/rooms/info'
import { defaultRoomListHandler, roomListRouteHandler } from './routes/rooms/list'
import {
    ServerInfoHandler,
    defaultServerInfoHandler,
    serverInfoRouteHandler,
} from './routes/server-info'
import { skinCommunityRouteHandler } from './routes/skins/community'
import { skinCommunityActionRouteHandler } from './routes/skins/community-action'
import { skinCommunityCommentListRouteHandler } from './routes/skins/community-comment-list'
import { defaultSkinDetailsHandler, skinDetailsRouteHandler } from './routes/skins/details'
import { defaultSkinInfoHandler, skinInfoRouteHandler } from './routes/skins/info'
import { defaultSkinListHandler, skinListRouteHandler } from './routes/skins/list'

export type SonolusDatabase = {
    info: DatabaseServerInfo
    posts: PostItemModel[]
    playlists: PlaylistItemModel[]
    levels: LevelItemModel[]
    skins: SkinItemModel[]
    backgrounds: BackgroundItemModel[]
    effects: EffectItemModel[]
    particles: ParticleItemModel[]
    engines: EngineItemModel[]
    replays: ReplayItemModel[]
    rooms: RoomItemModel[]
}

export type SonolusBase = {
    address?: string
    db: SonolusDatabase
}

export type SonolusRouteHandler = <
    TPostSearches extends ServerFormsModel,
    TPlaylistSearches extends ServerFormsModel,
    TLevelSearches extends ServerFormsModel,
    TSkinSearches extends ServerFormsModel,
    TBackgroundSearches extends ServerFormsModel,
    TEffectSearches extends ServerFormsModel,
    TParticleSearches extends ServerFormsModel,
    TEngineSearches extends ServerFormsModel,
    TReplaySearches extends ServerFormsModel,
    TRoomSearches extends ServerFormsModel,
    TPostCommunityActions extends ServerFormsModel | undefined,
    TPlaylistCommunityActions extends ServerFormsModel | undefined,
    TLevelCommunityActions extends ServerFormsModel | undefined,
    TSkinCommunityActions extends ServerFormsModel | undefined,
    TBackgroundCommunityActions extends ServerFormsModel | undefined,
    TEffectCommunityActions extends ServerFormsModel | undefined,
    TParticleCommunityActions extends ServerFormsModel | undefined,
    TEngineCommunityActions extends ServerFormsModel | undefined,
    TReplayCommunityActions extends ServerFormsModel | undefined,
    TRoomCommunityActions extends ServerFormsModel | undefined,
    TRoomCreates extends ServerFormsModel,
>(
    sonolus: Sonolus<
        TPostSearches,
        TPlaylistSearches,
        TLevelSearches,
        TSkinSearches,
        TBackgroundSearches,
        TEffectSearches,
        TParticleSearches,
        TEngineSearches,
        TReplaySearches,
        TRoomSearches,
        TPostCommunityActions,
        TPlaylistCommunityActions,
        TLevelCommunityActions,
        TSkinCommunityActions,
        TBackgroundCommunityActions,
        TEffectCommunityActions,
        TParticleCommunityActions,
        TEngineCommunityActions,
        TReplayCommunityActions,
        TRoomCommunityActions,
        TRoomCreates
    >,
    session: string | undefined,
    req: Request,
    res: Response,
) => Promisable<void>

export type SonolusItemsConfig<
    TSonolus extends SonolusBase,
    TSearches extends ServerFormsModel,
    TCommunityActions extends ServerFormsModel | undefined,
    TDatabaseItem,
> = {
    searches: TSearches
    communityActions: TCommunityActions
    infoHandler: ItemInfoHandler<TSonolus, TDatabaseItem>
    listHandler: ItemListHandler<TSonolus, ParsedSearchQuery<TSearches>, TDatabaseItem>
    detailsHandler: ItemDetailsHandler<TSonolus, TDatabaseItem>
    communityHandler: ItemCommunityHandler<TSonolus, TCommunityActions>
    communityCommentListHandler: ItemCommunityCommentListHandler<TSonolus, TCommunityActions>
    communityActionHandler: ItemCommunityActionHandler<
        TSonolus,
        ParsedQuery<NonNullable<TCommunityActions>>
    >
}

export type MultiplayerConfig<
    TSonolus extends SonolusBase,
    TRoomCreates extends ServerFormsModel,
> = {
    creates: TRoomCreates
    createRoomHandler: CreateRoomHandler<TSonolus>
    joinRoomHandler: JoinRoomHandler<TSonolus, TRoomCreates>
}

export class Sonolus<
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
    TPostCommunityActions extends ServerFormsModel | undefined = undefined,
    TPlaylistCommunityActions extends ServerFormsModel | undefined = undefined,
    TLevelCommunityActions extends ServerFormsModel | undefined = undefined,
    TSkinCommunityActions extends ServerFormsModel | undefined = undefined,
    TBackgroundCommunityActions extends ServerFormsModel | undefined = undefined,
    TEffectCommunityActions extends ServerFormsModel | undefined = undefined,
    TParticleCommunityActions extends ServerFormsModel | undefined = undefined,
    TEngineCommunityActions extends ServerFormsModel | undefined = undefined,
    TReplayCommunityActions extends ServerFormsModel | undefined = undefined,
    TRoomCommunityActions extends ServerFormsModel | undefined = undefined,
    TRoomCreates extends ServerFormsModel = {},
> {
    private readonly fallbackLocale: string

    readonly address?: string
    readonly authentication: boolean
    readonly multiplayer: boolean

    readonly db: SonolusDatabase
    readonly router: Router

    authenticateHandler: AuthenticateHandler<this> = defaultAuthenticateHandler
    sessionHandler: SessionHandler<this> = defaultSessionHandler

    serverInfoHandler: ServerInfoHandler<this> = defaultServerInfoHandler

    readonly postConfig: SonolusItemsConfig<
        this,
        TPostSearches,
        TPostCommunityActions,
        PostItemModel
    >
    readonly playlistConfig: SonolusItemsConfig<
        this,
        TPlaylistSearches,
        TPlaylistCommunityActions,
        PlaylistItemModel
    >
    readonly levelConfig: SonolusItemsConfig<
        this,
        TLevelSearches,
        TLevelCommunityActions,
        LevelItemModel
    >
    readonly skinConfig: SonolusItemsConfig<
        this,
        TSkinSearches,
        TSkinCommunityActions,
        SkinItemModel
    >
    readonly backgroundConfig: SonolusItemsConfig<
        this,
        TBackgroundSearches,
        TBackgroundCommunityActions,
        BackgroundItemModel
    >
    readonly effectConfig: SonolusItemsConfig<
        this,
        TEffectSearches,
        TEffectCommunityActions,
        EffectItemModel
    >
    readonly particleConfig: SonolusItemsConfig<
        this,
        TParticleSearches,
        TParticleCommunityActions,
        ParticleItemModel
    >
    readonly engineConfig: SonolusItemsConfig<
        this,
        TEngineSearches,
        TEngineCommunityActions,
        EngineItemModel
    >
    readonly replayConfig: SonolusItemsConfig<
        this,
        TReplaySearches,
        TReplayCommunityActions,
        ReplayItemModel
    >
    readonly roomConfig: SonolusItemsConfig<
        this,
        TRoomSearches,
        TRoomCommunityActions,
        RoomItemModel
    >

    readonly multiplayerConfig: MultiplayerConfig<this, TRoomCreates>

    constructor(
        app: Express,
        options?: Partial<{
            address: string
            basePath: string
            authentication: boolean
            multiplayer: boolean
            fallbackLocale: string
            mode: 'custom' | 'redirect' | 'spa'
            redirectPath: string
            spaRoot: string
            postSearches: TPostSearches
            playlistSearches: TPlaylistSearches
            levelSearches: TLevelSearches
            skinSearches: TSkinSearches
            backgroundSearches: TBackgroundSearches
            effectSearches: TEffectSearches
            particleSearches: TParticleSearches
            engineSearches: TEngineSearches
            replaySearches: TReplaySearches
            roomSearches: TRoomSearches
            postCommunityActions: TPostCommunityActions
            playlistCommunityActions: TPlaylistCommunityActions
            levelCommunityActions: TLevelCommunityActions
            skinCommunityActions: TSkinCommunityActions
            backgroundCommunityActions: TBackgroundCommunityActions
            effectCommunityActions: TEffectCommunityActions
            particleCommunityActions: TParticleCommunityActions
            engineCommunityActions: TEngineCommunityActions
            replayCommunityActions: TReplayCommunityActions
            roomCommunityActions: TRoomCommunityActions
            roomCreates: TRoomCreates
        }>,
    ) {
        const {
            address,
            basePath = '',
            authentication = false,
            multiplayer = false,
            fallbackLocale = 'en',
            mode = 'custom',
            redirectPath,
            spaRoot,
            postSearches = {},
            playlistSearches = {},
            levelSearches = {},
            skinSearches = {},
            backgroundSearches = {},
            effectSearches = {},
            particleSearches = {},
            engineSearches = {},
            replaySearches = {},
            roomSearches = {},
            postCommunityActions,
            playlistCommunityActions,
            levelCommunityActions,
            skinCommunityActions,
            backgroundCommunityActions,
            effectCommunityActions,
            particleCommunityActions,
            engineCommunityActions,
            replayCommunityActions,
            roomCommunityActions,
            roomCreates,
        } = options ?? {}

        this.fallbackLocale = fallbackLocale

        this.address = address
        this.authentication = authentication
        this.multiplayer = multiplayer

        this.db = {
            info: {
                title: {},
            },
            posts: [],
            playlists: [],
            levels: [],
            skins: [],
            backgrounds: [],
            effects: [],
            particles: [],
            engines: [],
            replays: [],
            rooms: [],
        }

        this.router = express.Router()

        this.postConfig = {
            searches: postSearches as never,
            communityActions: postCommunityActions as never,
            infoHandler: defaultPostInfoHandler,
            listHandler: defaultPostListHandler,
            detailsHandler: defaultPostDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.playlistConfig = {
            searches: playlistSearches as never,
            communityActions: playlistCommunityActions as never,
            infoHandler: defaultPlaylistInfoHandler,
            listHandler: defaultPlaylistListHandler,
            detailsHandler: defaultPlaylistDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.levelConfig = {
            searches: levelSearches as never,
            communityActions: levelCommunityActions as never,
            infoHandler: defaultLevelInfoHandler,
            listHandler: defaultLevelListHandler,
            detailsHandler: defaultLevelDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.skinConfig = {
            searches: skinSearches as never,
            communityActions: skinCommunityActions as never,
            infoHandler: defaultSkinInfoHandler,
            listHandler: defaultSkinListHandler,
            detailsHandler: defaultSkinDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.backgroundConfig = {
            searches: backgroundSearches as never,
            communityActions: backgroundCommunityActions as never,
            infoHandler: defaultBackgroundInfoHandler,
            listHandler: defaultBackgroundListHandler,
            detailsHandler: defaultBackgroundDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.effectConfig = {
            searches: effectSearches as never,
            communityActions: effectCommunityActions as never,
            infoHandler: defaultEffectInfoHandler,
            listHandler: defaultEffectListHandler,
            detailsHandler: defaultEffectDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.particleConfig = {
            searches: particleSearches as never,
            communityActions: particleCommunityActions as never,
            infoHandler: defaultParticleInfoHandler,
            listHandler: defaultParticleListHandler,
            detailsHandler: defaultParticleDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.engineConfig = {
            searches: engineSearches as never,
            communityActions: engineCommunityActions as never,
            infoHandler: defaultEngineInfoHandler,
            listHandler: defaultEngineListHandler,
            detailsHandler: defaultEngineDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.replayConfig = {
            searches: replaySearches as never,
            communityActions: replayCommunityActions as never,
            infoHandler: defaultReplayInfoHandler,
            listHandler: defaultReplayListHandler,
            detailsHandler: defaultReplayDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.roomConfig = {
            searches: roomSearches as never,
            communityActions: roomCommunityActions as never,
            infoHandler: defaultRoomInfoHandler,
            listHandler: defaultRoomListHandler,
            detailsHandler: defaultRoomDetailsHandler,
            communityHandler: defaultItemCommunityHandler,
            communityCommentListHandler: defaultItemCommunityCommentListHandler,
            communityActionHandler: defaultItemCommunityActionHandler,
        }
        this.multiplayerConfig = {
            creates: roomCreates as never,
            createRoomHandler: defaultCreateRoomHandler,
            joinRoomHandler: defaultJoinRoomHandler,
        }

        this.postAuthenticate()

        this.getAPI('/sonolus/info', serverInfoRouteHandler)

        this.getAPI('/sonolus/posts/info', postInfoRouteHandler)
        this.getAPI('/sonolus/playlists/info', playlistInfoRouteHandler)
        this.getAPI('/sonolus/levels/info', levelInfoRouteHandler)
        this.getAPI('/sonolus/skins/info', skinInfoRouteHandler)
        this.getAPI('/sonolus/backgrounds/info', backgroundInfoRouteHandler)
        this.getAPI('/sonolus/effects/info', effectInfoRouteHandler)
        this.getAPI('/sonolus/particles/info', particleInfoRouteHandler)
        this.getAPI('/sonolus/engines/info', engineInfoRouteHandler)
        this.getAPI('/sonolus/replays/info', replayInfoRouteHandler)

        this.getAPI('/sonolus/posts/list', postListRouteHandler)
        this.getAPI('/sonolus/playlists/list', playlistListRouteHandler)
        this.getAPI('/sonolus/levels/list', levelListRouteHandler)
        this.getAPI('/sonolus/skins/list', skinListRouteHandler)
        this.getAPI('/sonolus/backgrounds/list', backgroundListRouteHandler)
        this.getAPI('/sonolus/effects/list', effectListRouteHandler)
        this.getAPI('/sonolus/particles/list', particleListRouteHandler)
        this.getAPI('/sonolus/engines/list', engineListRouteHandler)
        this.getAPI('/sonolus/replays/list', replayListRouteHandler)

        this.getAPI('/sonolus/posts/:name', postDetailsRouteHandler)
        this.getAPI('/sonolus/playlists/:name', playlistDetailsRouteHandler)
        this.getAPI('/sonolus/levels/:name', levelDetailsRouteHandler)
        this.getAPI('/sonolus/skins/:name', skinDetailsRouteHandler)
        this.getAPI('/sonolus/backgrounds/:name', backgroundDetailsRouteHandler)
        this.getAPI('/sonolus/effects/:name', effectDetailsRouteHandler)
        this.getAPI('/sonolus/particles/:name', particleDetailsRouteHandler)
        this.getAPI('/sonolus/engines/:name', engineDetailsRouteHandler)
        this.getAPI('/sonolus/replays/:name', replayDetailsRouteHandler)

        this.getAPI('/sonolus/posts/:name/community', postCommunityRouteHandler)
        this.getAPI('/sonolus/playlists/:name/community', playlistCommunityRouteHandler)
        this.getAPI('/sonolus/levels/:name/community', levelCommunityRouteHandler)
        this.getAPI('/sonolus/skins/:name/community', skinCommunityRouteHandler)
        this.getAPI('/sonolus/backgrounds/:name/community', backgroundCommunityRouteHandler)
        this.getAPI('/sonolus/effects/:name/community', effectCommunityRouteHandler)
        this.getAPI('/sonolus/particles/:name/community', particleCommunityRouteHandler)
        this.getAPI('/sonolus/engines/:name/community', engineCommunityRouteHandler)
        this.getAPI('/sonolus/replays/:name/community', replayCommunityRouteHandler)

        this.getAPI(
            '/sonolus/posts/:name/community/comments/list',
            postCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/playlists/:name/community/comments/list',
            playlistCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/levels/:name/community/comments/list',
            levelCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/skins/:name/community/comments/list',
            skinCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/backgrounds/:name/community/comments/list',
            backgroundCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/effects/:name/community/comments/list',
            effectCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/particles/:name/community/comments/list',
            particleCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/engines/:name/community/comments/list',
            engineCommunityCommentListRouteHandler,
        )
        this.getAPI(
            '/sonolus/replays/:name/community/comments/list',
            replayCommunityCommentListRouteHandler,
        )

        this.postAPI('/sonolus/posts/:name/community', postCommunityActionRouteHandler)
        this.postAPI('/sonolus/playlists/:name/community', playlistCommunityActionRouteHandler)
        this.postAPI('/sonolus/levels/:name/community', levelCommunityActionRouteHandler)
        this.postAPI('/sonolus/skins/:name/community', skinCommunityActionRouteHandler)
        this.postAPI('/sonolus/backgrounds/:name/community', backgroundCommunityActionRouteHandler)
        this.postAPI('/sonolus/effects/:name/community', effectCommunityActionRouteHandler)
        this.postAPI('/sonolus/particles/:name/community', particleCommunityActionRouteHandler)
        this.postAPI('/sonolus/engines/:name/community', engineCommunityActionRouteHandler)
        this.postAPI('/sonolus/replays/:name/community', replayCommunityActionRouteHandler)

        if (multiplayer) {
            this.getAPI('/sonolus/rooms/info', roomInfoRouteHandler)
            this.getAPI('/sonolus/rooms/list', roomListRouteHandler)
            this.postAPI('/sonolus/rooms/create', createRoomRouteHandler)
            this.postAPI('/sonolus/rooms/:name', joinRoomRouteHandler)
        }

        app.use(basePath, this.router)

        if (mode === 'spa') {
            if (!spaRoot) throw new Error('Missing SPA root')

            installSPA(app, basePath, spaRoot)
        } else if (mode === 'redirect') {
            if (!redirectPath) throw new Error('Missing redirect path')

            installRedirect(app, basePath, redirectPath)
        }
    }

    public load(path: string): void {
        const dbPath = `${path}/db.json`
        const db = databaseParser(JSON.parse(readFileSync(dbPath, 'utf-8')), `${path}/db.json`)

        this.db.info = db.info
        this.db.posts.push(...db.posts)
        this.db.playlists.push(...db.playlists)
        this.db.levels.push(...db.levels)
        this.db.skins.push(...db.skins)
        this.db.backgrounds.push(...db.backgrounds)
        this.db.effects.push(...db.effects)
        this.db.particles.push(...db.particles)
        this.db.engines.push(...db.engines)
        this.db.replays.push(...db.replays)

        this.router.use('/sonolus/repository', express.static(`${path}/repository`))
    }

    public add(data: Buffer | string, hash?: string): SRL {
        if (!hash) {
            hash = sonolusHash(typeof data === 'string' ? readFileSync(data) : data)
        }

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

    public localize(text: LocalizationText, locale: string): string {
        return localize(text, locale, this.fallbackLocale)
    }

    private postAuthenticate() {
        if (!this.authentication) return

        this.router.post(
            '/sonolus/authenticate',
            express.raw({ type: 'application/json' }),
            async (req, res) => {
                res.set('Sonolus-Version', version.sonolus)

                try {
                    const body = req.body as unknown
                    if (!(body instanceof Buffer)) {
                        res.status(400).end()
                        return
                    }

                    const parseResult = authenticateServerRequestSchema.safeParse(
                        safeJsonParse(body.toString('utf8')),
                    )
                    if (!parseResult.success) {
                        res.status(400).end()
                        return
                    }

                    if (parseResult.data.address !== this.address) {
                        res.status(400).end()
                        return
                    }

                    const signature = req.headers['sonolus-signature']
                    if (typeof signature !== 'string') {
                        res.status(400).end()
                        return
                    }

                    const signaturePublicKey = await getSignaturePublicKey()

                    const verifyResult = await webcrypto.subtle.verify(
                        { name: 'ECDSA', hash: 'SHA-256' },
                        signaturePublicKey,
                        Buffer.from(signature, 'base64'),
                        body,
                    )
                    if (!verifyResult) {
                        res.status(400).end()
                        return
                    }

                    const response = await this.authenticateHandler(this, parseResult.data)
                    if (!response) {
                        res.status(401).end()
                        return
                    }

                    res.json(response)
                } catch (error) {
                    console.error('[ERROR]', error)
                    res.status(500).end()
                }
            },
        )
    }

    private getAPI(path: string, handler: SonolusRouteHandler) {
        this.router.get(path, this.toHandler(handler))
    }

    private postAPI(path: string, handler: SonolusRouteHandler) {
        this.router.post(path, express.raw({ type: 'application/json' }), this.toHandler(handler))
    }

    private toHandler(handler: SonolusRouteHandler) {
        return async (req: Request, res: Response) => {
            req.localization =
                typeof req.query.localization === 'string' ? req.query.localization : ''
            req.localize = (text: LocalizationText) => this.localize(text, req.localization)

            res.set('Sonolus-Version', version.sonolus)

            try {
                const session =
                    typeof req.headers['sonolus-session'] === 'string'
                        ? req.headers['sonolus-session']
                        : undefined

                if (!(await this.sessionHandler(this, session))) {
                    res.status(401).end()
                    return
                }

                await handler(this, session, req, res)
            } catch (error) {
                console.error('[ERROR]', error)
                res.status(500).end()
            }
        }
    }
}

const installSPA = (app: Express, basePath: string, spaRoot: string) => {
    const indexPath = resolve(spaRoot, 'index.html')

    app.use(basePath, express.static(spaRoot))

    for (const type of [
        'rooms',
        'posts',
        'playlists',
        'levels',
        'skins',
        'backgrounds',
        'effects',
        'particles',
        'engines',
        'replays',
    ]) {
        app.get(`${basePath}/${type}/:any`, (req, res) => {
            res.sendFile(indexPath)
        })
    }

    app.use(basePath, (req, res) => {
        res.status(404).sendFile(indexPath)
    })
}

const installRedirect = (app: Express, basePath: string, redirectPath: string) => {
    app.get(basePath, (req, res) => {
        res.redirect(`https://open.sonolus.com/${redirectPath}`)
    })

    for (const type of [
        'rooms',
        'posts',
        'playlists',
        'levels',
        'skins',
        'backgrounds',
        'effects',
        'particles',
        'engines',
        'replays',
    ]) {
        app.get(`${basePath}/${type}/info`, (req, res) => {
            res.redirect(`https://open.sonolus.com/${redirectPath}/${type}/info`)
        })

        app.get(`${basePath}/${type}/list`, (req, res) => {
            res.redirect(
                `https://open.sonolus.com/${redirectPath}/${type}/list${getSearch(req.query)}`,
            )
        })

        app.get(`${basePath}/${type}/:name`, (req, res) => {
            res.redirect(`https://open.sonolus.com/${redirectPath}/${type}/${req.params.name}`)
        })
    }
}

const getSearch = (query: ParsedQs) => {
    const params = new URLSearchParams()

    for (const key in query) {
        params.append(key, `${query[key]}`)
    }

    const queryString = params.toString()
    return queryString && `?${queryString}`
}
