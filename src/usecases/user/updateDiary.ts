import { IUser, User } from './../../models/User'
import { createUser } from './createUser'
import { getUser } from './getUser'
interface IRequest {
    userId: string
    num1: number
    num2: number
    num3: number
}

function randomItem(array: any[]) {
    return array[Math.floor(Math.random() * array.length)]
}

export async function updateDiary({ userId, num1, num2, num3 }: IRequest) {
    await createUser({ userId })
    const diary = await getUser(userId, 'diary')
    console.log(diary, [num1, num2, num3])

    const notInDiary = [num1, num2, num3].filter(i => !diary.includes(i))
    if (!notInDiary.length) return false

    const randomPage = randomItem(notInDiary)
    const newDiary = [...diary, randomPage]

    const user = (await User.findOne({ id: userId })) as IUser
    user.diary = newDiary
    user.save()
}
