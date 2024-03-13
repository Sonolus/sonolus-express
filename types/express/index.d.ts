declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
        localization: string
        localize: (text: LocalizationText) => string
    }
}
