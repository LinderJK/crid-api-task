import * as http from 'node:http'
import userRoutes from './routes/userRoutes'

const PORT = process.env.PORT || 3000

const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html charset=utf-8' })
            res.end(`<h1>Hello to CRUD API</h1>
                  <p>Main API route: /api/users</p>
                  <p>Methods: GET, POST, PUT, DELETE</p>
                  <p>Use /api/users to get all users</p>
                  <p>Use api/users/:id to get user by id</p>
                  <p>Methods PUT and DELETE require user id</p>
                  `)

            return
        }
        if (req.url === '/api/users') {
            userRoutes(req, res)
        }
        res.statusCode = 404
        res.end(
            JSON.stringify({
                message:
                    'This api route does not exist please use a valid route',
            })
        )
    }
)

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
