import express, {Request,Response} from 'express';
import {findall, find,create, update,  remove} from './books.servise';
import { BookType } from './book.type';

export const bookRouter = express.Router();

bookRouter.get('/',async(req:Request,res:Response) => {
try {
    const books =await findall(); 
    res.status(200).send(books);
    
} catch (error:any) {
    res.status(500).send(error.message);
}
});



bookRouter.get('/:id',async(req:Request,res:Response) => {
    const id = parseInt(req.params.id);
    try {
        const book =await find(id);
        
        if(book){
            
           return res.status(200).send(book);
        }
        res.status(404).send('book does not exist');
        
    } catch (error:any) {
        res.status(500).send(error.message);
    }
    });


    bookRouter.post('/',async(req:Request,res:Response) => {
        try {
            const book =req.body as BookType;

            const bookCreated= await create(book);
            res.status(201).send(book);
            
        } catch (error:any) {
            res.status(500).send(error.message);
        }
        });


        bookRouter.put('/:id',async(req:Request,res:Response) => {
            const id = parseInt(req.params.id);

            try {
                const book =req.body as BookType;
    
                const bookUpdated= await update(id,book);
                res.status(202).send(book);
                
            } catch (error:any) {
                res.status(500).send(error.message);
            }
            });    


            bookRouter.delete('/:id',async(req:Request,res:Response) => {
                const id = parseInt(req.params.id);
    
                try {
                    const book =await remove(id);

                    if(book){
                        return res.status(203).send(book);
                     }
                     res.status(404).send('book does not exist');
                    
                } catch (error:any) {
                    res.status(500).send(error.message);
                }
                });    
