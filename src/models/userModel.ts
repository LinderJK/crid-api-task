import createUUID from '../utils/uuidUtils'

export interface User {
    name: string
    age: number
    id: string
    hobbies: string[]
}

const users: User[] = []

export const getAllUsers = async () => users || 'No users found'

export const getUser = async (id: string) =>
    users.find((user) => user.id === id)

export const addUser = async (user: User) => {
    const newUser = { ...user, id: createUUID() as string }
    users.push(newUser)
    return newUser
}

export const updateUser = async (id: string, user: User) => {
    const index = users.findIndex((u) => u.id === id)
    if (index !== -1) {
        users[index] = { ...user, id }
        return user
    }
}

export const deleteUser = async (id: string) => {
    const index = users.findIndex((u) => u.id === id)
    if (index !== -1) {
        users.splice(index, 1)
    }
}
