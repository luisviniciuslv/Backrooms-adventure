import { User } from "../../models/User";

interface iRequest {
  userId: number;
}

export async function createUser({ userId }: iRequest) {
  const hasUser = await User.findOne({ id: userId });
  if (!hasUser){
    await User.create({ id: userId, itens: [], money: 0 });
  }
  else {
    console.log("usuario já criado");
  }
}
