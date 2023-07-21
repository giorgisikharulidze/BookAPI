import express, {Request,Response} from 'express';
import {findall, find,create, update,  remove} from './authors.servise';
import { AuthorType } from './author.type';

export const authorRouter = express.Router();

authorRouter.get('/',async(req:Request,res:Response) => {
try {
    const authors =await findall(); 
    res.status(200).send(authors);
    
} catch (error:any) {
    res.status(500).send(error.message);
}
});


authorRouter.get('/:id',async(req:Request,res:Response) => {
    const id = parseInt(req.params.id);
    try {
        const author =await find(id);
        
        if(author){
           return res.status(200).send(author);
        }
        res.status(404).send('author does not exist');
        
    } catch (error:any) {
        res.status(500).send(error.message);
    }
    });


    authorRouter.post('/',async(req:Request,res:Response) => {
        try {
            const author =req.body as AuthorType;

            const authorCreated= await create(author);
            res.status(201).send(author);
            
        } catch (error:any) {
            res.status(500).send(error.message);
        }
        });


        authorRouter.put('/:id',async(req:Request,res:Response) => {
            const id = parseInt(req.params.id);

            try {
                const author =req.body as AuthorType;
    
                const authorUpdated= await update(id,author);
                res.status(202).send(author);
                
            } catch (error:any) {
                res.status(500).send(error.message);
            }
            });    


            authorRouter.delete('/:id',async(req:Request,res:Response) => {
                const id = parseInt(req.params.id);
    
                try {
                    const author =await remove(id);

                    if(author){
                        return res.status(203).send(author);
                     }
                     res.status(404).send('author does not exist');
                    
                } catch (error:any) {
                    res.status(500).send(error.message);
                }
                });    
