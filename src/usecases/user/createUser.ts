import { Book, User } from "../../models/User";

interface iRequest {
  userId: number;
}

export async function createUser({ userId }: iRequest) {
  const hasUser = await User.findOne({ id: userId });

  const books: Book[] = [
    {
      pages: [],
      name: "0",
      maxPages: 3,
    },
  ];

  if (!hasUser) {
    await User.create({ id: userId, backrooms: [0], stamina: 3, itens: [], books });
  } else {
    return;
  }
}
