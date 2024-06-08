export type FilterItems<T> = (items: T[], keywords: string) => T[]

export const createFilterItems =
    <T>(props: (keyof T)[]): FilterItems<T> =>
    (items, keywords) => {
        const fullTerm = keywords.trim().toLowerCase()
        if (!fullTerm) return items

        const terms = fullTerm.split(' ')
        if (terms.length === 0) return items

        return items
            .map((item) => ({
                item,
                results: terms.map((term) => matchTerm(item, props, term)),
            }))
            .filter(({ results }) => results.every((result) => result > 0))
            .map(({ item, results }) => ({
                item,
                full: matchTerm(item, props, fullTerm),
                exacts: results.filter((result) => result === 2).length,
                partials: results.filter((result) => result === 1).length,
            }))
            .sort((a, b) => b.full - a.full || b.exacts - a.exacts || b.partials - a.partials)
            .map(({ item }) => item)
    }

const matchTerm = <T>(item: T, keywordProps: (keyof T)[], term: string) => {
    let result = 0
    for (const prop of keywordProps) {
        const texts = getTexts(item[prop])

        for (const text of texts) {
            if (text === term) {
                result = 2
                break
            } else if (text.includes(term)) {
                result = 1
            }
        }
    }
    return result
}

const getTexts = (value: unknown): string[] => {
    switch (typeof value) {
        case 'number':
        case 'bigint':
        case 'boolean':
            return [`${value}`]
        case 'string':
            return [value.toLowerCase()]
        case 'object':
            if (!value) return []

            if (Array.isArray(value)) {
                return value.flatMap(getTexts)
            } else {
                return Object.values(value).flatMap(getTexts)
            }
        case 'symbol':
        case 'undefined':
        case 'function':
            return []
    }
}
