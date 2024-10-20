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

    if (!user.name || typeof user.name !== 'string') {
        return {
            status: false,
            message: 'Name is required and should be a string',
        }
    }

    if (!user.age || typeof user.age !== 'number') {
        return {
            status: false,
            message: 'Age is required and should be a number',
        }
    }

    if (
        !Array.isArray(user.hobbies) ||
        !user.hobbies.every((hobby) => typeof hobby === 'string')
    ) {
        return {
            status: false,
            message:
                'Hobbies is required and should be an array of strings or an empty array',
        }
    }

    return {
        status: true,
        message: 'User created successfully',
    }
}
