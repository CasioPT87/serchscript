const { verifyToken } = require('../utils')

const authorization = async (req, res, next) => {
    const token = req.cookies['cucarachasAppSession']
    if (token) {
        const decoded = await verifyToken(token)
        return next()
    }
    res.status(500).send('authentication failed!!') 
}

module.exports = {
    authorization
}