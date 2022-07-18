import { User } from "../../models/User";
import { createUser } from "./createUser";
export async function getUser(userId: number, field: string) {
  await createUser({ userId: userId });
  try{
    const user = await User.findOne({ id: userId })
    if (user){
      ;
      return user[field]
    }
  }catch{
    console.log('erro')
  }
}
