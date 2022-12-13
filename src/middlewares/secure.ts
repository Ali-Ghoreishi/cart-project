import rateLimit from 'express-rate-limit'

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10000, // 10 second
    max: 1, // Limit each IP to 1 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: function (req, res, next) {
        const error: any = new Error(
            "You sent too many requests. Please wait a while then try again"
        );
        error.statusCode = 429;
        throw error;
    }
})

module.exports = limiter







