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
    it('should get user by id', async () => {
        const newUserResponse = await request(testServer)
            .post('/api/users/')
            .send({
                name: 'test',
                age: 10,
                hobbies: ['test'],
            })
        const { id: userId } = newUserResponse.body
        expect(newUserResponse.status).toBe(201)

        const response = await request(testServer).get(`/api/users/${userId}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            name: 'test',
            age: 10,
            id: userId,
            hobbies: ['test'],
        })
    })

    it('should update user by id', async () => {
        const newUserResponse = await request(testServer)
            .post('/api/users/')
            .send({
                name: 'test',
                age: 10,
                hobbies: ['test'],
            })
        const { id: userId } = newUserResponse.body
        expect(newUserResponse.status).toBe(201)

        const response = await request(testServer)
            .put(`/api/users/${userId}`)
            .send({
                name: 'test2',
                age: 11,
                hobbies: ['test2'],
            })
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            name: 'test2',
            age: 11,
            id: userId,
            hobbies: ['test2'],
        })
    })

    it('should delete user by id', async () => {
        const newUserResponse = await request(testServer)
            .post('/api/users/')
            .send({
                name: 'test',
                age: 10,
                hobbies: ['test'],
            })
        const { id: userId } = newUserResponse.body
        expect(newUserResponse.status).toBe(201)

        const response = await request(testServer).delete(
            `/api/users/${userId}`
        )
        expect(response.status).toBe(204)
    })
    it('should not find deleted user', async () => {
        const newUserResponse = await request(testServer)
            .post('/api/users/')
            .send({
                name: 'test',
                age: 10,
                hobbies: ['test'],
            })
        const { id: userId } = newUserResponse.body
        expect(newUserResponse.status).toBe(201)

        const deleteResponse = await request(testServer).delete(
            `/api/users/${userId}`
        )
        expect(deleteResponse.status).toBe(204)

        const response = await request(testServer).get(`/api/users/${userId}`)
        expect(response.status).toBe(404)
        expect(response.text).toContain(`User with id ${userId} not found`)
    })
})
