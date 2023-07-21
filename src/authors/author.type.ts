export type BaseAuthorType = {
    firstName:string;
    lastName:string;
    email:string;

}

export type AuthorType = BaseAuthorType & {
    id:number;
}
