import { IncomingMessage, ServerResponse } from 'node:http'
import { addUser, getAllUsers, getUser } from '../models/userModel'
import validation from '../utils/validation'

export const getAllUsersHandler = async(
    req: IncomingMessage,
    res: ServerResponse
) => {
    try {
        const users = await getAllUsers()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ message: `Server error` }))
    }
}

export const postUserHandler = async(req: IncomingMessage, res: ServerResponse) => {
    let body = ''

    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', async() => {
        try {
            const user = JSON.parse(body)
            const validationResponse = validation(user)
            if (validationResponse.status) {
                const newUser = await addUser(user);
                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(newUser))
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(validationResponse))
            }
        } catch (error) {
            console.log(error)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ message: `Server error` }))
        }
    })
}

export const getUserByIdHandler = async(req: IncomingMessage, res: ServerResponse, id: string) => {
     try {
         const user = await getUser(id);
         if (user) {
             res.writeHead(200, { 'Content-Type': 'application/json' })
             return res.end(JSON.stringify(user))
         } else {
             res.writeHead(404, { 'Content-Type': 'application/json' })
             return res.end(
                 JSON.stringify({ message: `User with id ${id} not found` })
             )
         }
     } catch (error) {
         res.writeHead(500, { 'Content-Type': 'application/json' })
         return res.end(JSON.stringify({ message: 'Error fetching user' }))
     }
}