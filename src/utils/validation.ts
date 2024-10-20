import { User } from '../models/userModel'

interface Validation {
    status: boolean
    message: string
}

export default function validation(user: User): Validation {
    if (!user || Object.keys(user).length === 0) {
        return {
            status: false,
            message: 'User is required',
        }
    }
    if (!user.name) {
        return {
            status: false,
            message: 'Name is required',
        }
    }
    if (!user.age) {
        return {
            status: false,
            message: 'Age is required',
        }
    }
    if (!user.hobbies) {
        return {
            status: false,
            message: 'Hobbies is required',
        }
    }

    return {
        status: true,
        message: 'User created successfully',
    }
}
