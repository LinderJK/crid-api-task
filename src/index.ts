import dotenv from 'dotenv'
import * as http from 'node:http'
import userRoutes from './routes/userRoutes'

const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
dotenv.config({ path: envFile })

const PORT = process.env.PORT || 3000
const URL_LENGTH = 3

const createNewServer = () => {
    return http.createServer(
        (req: http.IncomingMessage, res: http.ServerResponse) => {
            if (req.url === '/') {
                res.writeHead(200, {
                    'Content-Type': 'text/html charset=utf-8',
                })
                res.end(`<h1>Hello to CRUD API</h1>
                  <p>Main API route: /api/users</p>
                  <p>Methods: GET, POST, PUT, DELETE</p>
                  <p>Use /api/users to get all users</p>
                  <p>Use api/users/:id to get user by id</p>
                  <p>Methods PUT and DELETE require user id</p>
                  `)

                return
            }

            const urlParts = req.url?.split('/') || []

            if (
                urlParts[1] === 'api' &&
                urlParts[2] === 'users' &&
                (urlParts.length === URL_LENGTH ||
                    urlParts.length === URL_LENGTH + 1)
            ) {
                userRoutes(req, res)
            } else {
                res.statusCode = 404
                res.end(
                    JSON.stringify({
                        message:
                            'This api route does not exist please use a valid route',
                    })
                )
            }
        }
    )
}
const server = createNewServer()
server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

export { server, createNewServer }
