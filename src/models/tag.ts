import { DatabaseTag, Tag } from '@sonolus/core'
import { Localize } from '../utils/localization'

export const toTag = (localize: Localize, tag: DatabaseTag): Tag => ({
    title: localize(tag.title),
    icon: tag.icon,
})

export const toTags = (localize: Localize, tags: DatabaseTag[]): Tag[] =>
    tags.map((tag) => toTag(localize, tag))
