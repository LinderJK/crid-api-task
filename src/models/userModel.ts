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
    users.push(user)
    return user
}
