import createUUID from '../utils/uuidUtils'

export interface User {
    name: string
    age: number
    id: string
    hobbies: string[]
}

const users: User[] = []

export const getAllUsers = () => users || 'No users found'

export const getUser = (id: string) => users.find((user) => user.id === id)

export const addUser = (user: User) => {
    const newUser = { ...user, id: createUUID() as string }

    users.push(newUser)
    return user
}
