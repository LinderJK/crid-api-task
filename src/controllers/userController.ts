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
    req.on('data', (chunk) => {
        console.log(chunk.toString())
        const user = JSON.parse(chunk.toString())
        const valid = validation(user)
        if (!valid.status) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: valid.message }))
        }
        const newUser = addUser(user)
        if (newUser) {
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newUser))
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: 'User not created' }))
        }
    })
}
