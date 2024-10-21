// import * as crypto from 'node:crypto'
import { v4 as uuidv4 } from 'uuid'

export default function createUUID() {
    // return crypto.randomBytes(16).toString('hex')
    return uuidv4()
}
