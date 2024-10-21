import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createNewServer } from '../src'
import * as http from 'node:http'

let testServer: http.Server

// afterEach(() => {
//     vi.clearAllMocks()
//     vi.resetAllMocks()
// })

beforeAll(async () => {
    testServer = createNewServer()
    await new Promise<void>((resolve) => {
        testServer.listen(3010, () => {
            console.log('Server for test start on port 3010')
            resolve()
        })
    })
})

afterAll(async () => {
    await new Promise<void>((resolve) => {
        testServer.close(() => {
            console.log('Server close')
            resolve()
        })
    })
})

describe('API Server Tests', () => {
    it('should start server', () => {
        expect(testServer).toBeDefined()
    })

    it('should return main page', async () => {
        const response = await request(testServer).get('/')
        expect(response.status).toBe(200)
        expect(response.text).toContain('Hello to CRUD API')
    })

    it('should return 404 for invalid routes', async () => {
        const response = await request(testServer).get('/invalid-route')
        expect(response.status).toBe(404)
        expect(response.text).toContain(
            'This api route does not exist please use a valid route'
        )
    })
    it('should return all users', async () => {
        const response = await request(testServer).get('/api/users/')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
    it('should add new user', async () => {
        const response = await request(testServer)
            .post('/api/users/')
            .send({
                name: 'test',
                age: 10,
                id: '1',
                hobbies: ['test'],
            })
        expect(response.status).toBe(201)
        expect(response.body).toEqual({
            name: 'test',
            age: 10,
            id: expect.any(String),
            hobbies: ['test'],
        })
    })
})
