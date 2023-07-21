export type BaseBookType = {
    title:string;
    genre:string;
    authorId:number;

}

export type BookType = BaseBookType & {
    id:number;
}

export type BookWithAuthorType = {
    id:number;
    title:string;
    genre:string;
    authorId:number;
    firstName:string;
    lastName:string;
    email:string;    
}
