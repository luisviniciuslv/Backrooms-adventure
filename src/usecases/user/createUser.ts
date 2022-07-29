import { User } from '../../models/User'
interface iRequest {
    userId: String
}

export async function createUser({ userId }: iRequest) {
    const hasUser = await User.findOne({ id: userId })
    
    if (!hasUser) {
        await User.create({ id: userId, backrooms: [0], stamina: 3, diary: [] })
    } else {
        return
    }
}
