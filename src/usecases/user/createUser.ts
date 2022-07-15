import { User, Book } from "../../models/User";

interface iRequest {
  userId: number;
}

export async function createUser({ userId }: iRequest) {
  const hasUser = await User.findOne({ id: userId });

  const books: Book[] = [
    {
      pages: [],
      name: "Prólogo",
      maxPages: 3
    },
    {
      pages: [],
      name: "O começo de tudo",
      maxPages: 20
    },
    {
      pages: [],
      name: "O Fim",
      maxPages: 40
    },
  ]

  if (!hasUser){
    await User.create({ id: userId, itens: [], money: 0, books });
  }
  else {
    console.log("usuario já criado");
  }
}
