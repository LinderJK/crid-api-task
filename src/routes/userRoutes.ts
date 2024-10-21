import { IncomingMessage, ServerResponse } from 'node:http'
import {
    getAllUsersHandler,
    getUserByIdHandler,
    postUserHandler,
    updateUserHandler,
} from '../controllers/userController'
import { validate as isUuid } from 'uuid'

export default function userRoutes(req: IncomingMessage, res: ServerResponse) {
    const urlParts = req.url?.split('/') || []
    const userId = urlParts[3] || undefined
    const method = req.method

    switch (method) {
        case 'GET':
            if (userId) {
                if (!isUuid(userId)) {
                    res.statusCode = 400
                    return res.end(
                        JSON.stringify({
                            message: `Invalid user id format: ${userId}`,
                        })
                    )
                }
                return getUserByIdHandler(req, res, userId)
            } else {
                return getAllUsersHandler(req, res)
            }
        case 'POST':
            return postUserHandler(req, res)
        case 'PUT':
            if (userId) {
                return updateUserHandler(req, res, userId)
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
