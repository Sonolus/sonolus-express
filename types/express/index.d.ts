declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
        localize: (text: LocalizationText) => string
    }
}
