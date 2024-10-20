import { IncomingMessage, ServerResponse } from 'node:http'

export default function userRoutes(req: IncomingMessage, res: ServerResponse) {
    const urlParts = req.url?.split('/') || []
    const userId = urlParts[3] || undefined
    const method = req.method

    switch (method) {
        case 'GET':
            if (userId) {
                //controller
            } else {
                res.statusCode = 200
                res.end(JSON.stringify('All users'))
            }
            break
        case 'POST':
            //controller
            break
        case 'PUT':
            if (userId) {
                //controller
            } else {
                res.statusCode = 500
                res.end(
                    JSON.stringify({
                        message: `Method ${method} could be contains user id`,
                    })
                )
            }
            //controller
            break
        case 'DELETE':
            if (userId) {
                //controller
            } else {
                res.statusCode = 500
                res.end(
                    JSON.stringify({
                        message: `Method ${method} could be contains user id`,
                    })
                )
            }
            break
        default:
            res.statusCode = 500
            res.end(JSON.stringify({ message: `Method ${method} not allowed` }))
            break
    }
}
