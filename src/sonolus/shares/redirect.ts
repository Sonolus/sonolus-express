import { Router } from 'express'
import { ParsedQs } from 'qs'

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

export class SonolusRedirectShare {
    readonly router: Router

    constructor(root: string) {
        this.router = Router()

        this.router.get('', (req, res) => {
            res.redirect(`https://open.sonolus.com/${root}`)
        })

        for (const path of itemTypes) {
            this.router.get(`/${path}/info`, (req, res) => {
                res.redirect(`https://open.sonolus.com/${root}/${path}/info`)
            })

            this.router.get(`/${path}/list`, (req, res) => {
                res.redirect(`https://open.sonolus.com/${root}/${path}/list${getSearch(req.query)}`)
            })

            this.router.get(`/${path}/:name`, (req, res) => {
                res.redirect(`https://open.sonolus.com/${root}/${path}/${req.params.name}`)
            })
        }
    }
}

const getSearch = (query: ParsedQs) => {
    const params = new URLSearchParams()

    for (const key in query) {
        params.append(key, `${query[key] as never}`)
    }

    const queryString = params.toString()
    return queryString && `?${queryString}`
}
