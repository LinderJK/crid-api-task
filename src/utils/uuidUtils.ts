import * as crypto from 'node:crypto'

export default function createUUID() {
    return crypto.randomBytes(16).toString('hex')
}
