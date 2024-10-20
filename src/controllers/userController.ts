import { IncomingMessage, ServerResponse } from 'node:http'
import { addUser, getAllUsers } from '../models/userModel'
import validation from '../utils/validation'

export const getAllUsersHandler = (
    req: IncomingMessage,
    res: ServerResponse
) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(getAllUsers()))
}

export const postUserHandler = (req: IncomingMessage, res: ServerResponse) => {
    let body = ''

    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', () => {
        try {
            const user = JSON.parse(body)
            const validationResponse = validation(user)
            if (validationResponse.status) {
                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(addUser(user)))
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(validationResponse))
            }
        } catch (error) {
            console.log(error)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: `Wrong JSON format` }))
        }
    })
}
