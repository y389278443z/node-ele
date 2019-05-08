exports.config =  {
    port: 8001,
    url: 'mongodb://localhost:27017/yz',
    session: {
        secret: 'yz',
        cookie: {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    }
}