import {User} from '../../models/User'


interface IRequest{
  userId: number;
  bookName: string;
}

export async function findBook({userId, bookName}:IRequest){


  const user = await User.findOne({id: userId});

  const book = user?.books.find((book) => book.name === bookName)

  console.log(book);
}