import createUUID from '../utils/uuidUtils'

export interface User {
    name: string
    age: number
    id: string
    hobbies: string[]
}

const users: User[] = []

export const getAllUsers = async() => users || 'No users found'

export const getUser = async(id: string) => users.find((user) => user.id === id)

export const addUser =async(user: User) => {
    const newUser = { ...user, id: createUUID() as string }
    users.push(newUser)
    return user
}
