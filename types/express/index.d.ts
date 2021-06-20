declare namespace Express {
    interface Request {
        localize: (text: LocalizationText) => string
    }
}
