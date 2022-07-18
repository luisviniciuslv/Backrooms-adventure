import { IUser, User } from "../../models/User";
import { createUser } from "./createUser";
interface IRequest {
  userId: number;
  moneyValue?: number;
  bookName: string;
}

export async function updateUser({ userId, bookName }: IRequest) {
  await createUser({ userId: userId });
  const user = (await User.findOne({ id: userId })) as IUser;

  const bookUser = user.books.find((book) => book.name === bookName);

  if (!bookUser) {
    console.log("Book dont exists!");
  } else {
    let pages: number[] = [];
    for (let i = 1; i <= bookUser?.maxPages; i++) {
      if (!bookUser.pages.some((page) => page === i)) {
        pages.push(i);
      }
    }
    const randomNumber = Math.floor(Math.random() * pages.length);
    if (pages.length > 0) {
      const selectedPage = pages[randomNumber];
      const bookIndex = user.books.findIndex((book) => book.name === bookName);
      bookUser.pages.push(selectedPage);
      user.books[bookIndex] = bookUser;
      await user.save();
      return true
    } else {
      return false;
    }
  }
}
