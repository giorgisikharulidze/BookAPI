import { AuthorType, BaseAuthorType } from "./author.type";
import fs from "fs";


const authorsFilePath = "C:/Users/g.sikharulidze/Desktop/BookAPI/src/authors/authors.json";

const authorsJson = fs.readFileSync(authorsFilePath, "utf-8");
const authors: AuthorType[] = JSON.parse(authorsJson);


export const findall = async (): Promise<AuthorType[]> =>{
    const authors = readAuthorsFromFile();
    return authors;
};

const readAuthorsFromFile = (): AuthorType[] => {
  const authorsJson = fs.readFileSync(authorsFilePath, "utf-8");
  return JSON.parse(authorsJson) as AuthorType[];
};

const saveAuthorsToFile = (authors: AuthorType[]): void => {
  const authorsJson = JSON.stringify(authors, null, 2); 
  fs.writeFileSync(authorsFilePath, authorsJson, "utf-8");
};




export const find = async (id: number): Promise<AuthorType | null> => {
    const authors = readAuthorsFromFile();
    const author = authors.find((author) => author.id === id);

  if (!author) return null;
  return author;
};
export const create =async (newauthor:BaseAuthorType) => {
     
    const id=new Date().valueOf();
    const author = {id,...newauthor}; 
    authors.push(author);
    saveAuthorsToFile(authors);

    return author;
};    



export const update = async (id: number, updatedAuthor: AuthorType): Promise<AuthorType | null> => {
    const authors = readAuthorsFromFile();
    
    const authorIndex = authors.findIndex((author) => author.id === id);
  
    if (authorIndex === -1) {
      return null; 
    }
  
    const updatedAuthorWithId: AuthorType = {
      ...updatedAuthor,
      id,
    };
  
    authors[authorIndex] = updatedAuthorWithId;
    saveAuthorsToFile(authors);
  
    return updatedAuthorWithId;
  };


  export const remove = async (id: number): Promise<boolean> => {
    const authors = readAuthorsFromFile();
  
    const authorIndex = authors.findIndex((author) => author.id === id);
  
    if (authorIndex === -1) {
      return false; 
    }
  
    authors.splice(authorIndex, 1);
    saveAuthorsToFile(authors);
  
    return true; 
  };
