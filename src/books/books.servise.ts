import { BookType, BaseBookType,BookWithAuthorType } from "./book.type";
import { AuthorType, BaseAuthorType } from "../authors/author.type";
import fs from "fs";

const booksFilePath = "C:/Users/g.sikharulidze/Desktop/BookAPI/src/books/books.json";
const authorsFilePath = "C:/Users/g.sikharulidze/Desktop/BookAPI/src/authors/authors.json";

const booksJson = fs.readFileSync(booksFilePath, "utf-8");
const books: BookType[] = JSON.parse(booksJson);



const readAuthorsFromFile = (): AuthorType[] => {
  const authorsJson = fs.readFileSync(authorsFilePath, "utf-8");
  return JSON.parse(authorsJson) as AuthorType[];
};


const readBooksFromFile = (): BookType[] => {
  const booksJson = fs.readFileSync(booksFilePath, "utf-8");
  return JSON.parse(booksJson) as BookType[];
};

const saveBooksToFile = (books: BookType[]): void => {
  const booksJson = JSON.stringify(books, null, 2); 
  fs.writeFileSync(booksFilePath, booksJson, "utf-8");
};

function mergeJSONObjects(authors: AuthorType[], books: BookType[], bookId?: number): BookWithAuthorType[]  {

  const filteredBooks = bookId ? books.filter(book => book.id === bookId) : books;

  const mergedData: BookWithAuthorType[] = [];
  for (const book of books) {
    if (bookId === undefined || book.id === bookId) {
      const author = authors.find((author) => author.id === book.authorId);
      if (author) {
        mergedData.push({
          ...book,
          firstName: author.firstName,
          lastName: author.lastName,
          email: author.email,
        });
      }
    }
  }

  return mergedData;
}

export const findall = async ():Promise<BookWithAuthorType[]> =>{
  const books = readBooksFromFile();
  const authors = readAuthorsFromFile();

  const res =mergeJSONObjects(authors, books);
  return res;

};


export const find = async (id: number): Promise<BookType[] | null>=> {
  const books = readBooksFromFile();
  const authors = readAuthorsFromFile();

  const res = mergeJSONObjects(authors, books,id);
  return res;
};





// export const findall = async (): Promise<BookType[]> =>{
//     const books = readBooksFromFile();
//     return books;
// };


// export const find = async (id: number): Promise<BookType | null> => {
//     const books = readBooksFromFile();
//     const book = books.find((book) => book.id === id);

//   if (!book) return null;
//   return book;
// };

export const create =async (newBook:BaseBookType) => {
     
    const id=new Date().valueOf();
    const book = {id,...newBook}; 
    books.push(book);
    saveBooksToFile(books);

    return book;
};    



export const update = async (id: number, updatedBook: BookType): Promise<BookType | null> => {
    const books = readBooksFromFile();
    const bookIndex = books.findIndex((book) => book.id === id);
  
    if (bookIndex === -1) {
      return null; 
    }
  
    const updatedBookWithId: BookType = {
      ...updatedBook,
      id,
    };
  
    books[bookIndex] = updatedBookWithId;
    saveBooksToFile(books);
  
    return updatedBookWithId;
  };


  export const remove = async (id: number): Promise<boolean> => {
    const books = readBooksFromFile();
  
    const bookIndex = books.findIndex((book) => book.id === id);
  
    if (bookIndex === -1) {
      return false; 
    }
  
    books.splice(bookIndex, 1);
    saveBooksToFile(books);
  
    return true; 
  };
