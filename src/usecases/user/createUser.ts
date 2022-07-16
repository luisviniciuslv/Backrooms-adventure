import { User, Book } from "../../models/User";

interface iRequest {
  userId: number;
}

export async function createUser({ userId }: iRequest) {
  const hasUser = await User.findOne({ id: userId });

  const books: Book[] = [
    {
      pages: [],
      name: "0",
      maxPages: 3
    },
  ]

  if (!hasUser){
    await User.create({ id: userId, stamina: 3, itens: [], books });
  }
  else {
    return
  }
}
