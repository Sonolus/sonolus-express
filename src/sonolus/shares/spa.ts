import express, { Router } from 'express'
import { resolve } from 'node:path'

const itemTypes = [
    'posts',
    'playlists',
    'levels',
    'skins',
    'backgrounds',
    'effects',
    'particles',
    'engines',
    'replays',
    'rooms',
] as const

export class SonolusSpaShare {
    readonly router: Router

    constructor(root: string) {
        this.router = Router()

        const indexPath = resolve(root, 'index.html')

        this.router.use(express.static(root))

        for (const path of itemTypes) {
            this.router.get(`/${path}/:any`, (req, res) => {
                res.sendFile(indexPath)
            })
        }

        this.router.use((req, res) => {
            res.status(404).sendFile(indexPath)
        })
    }
}
