import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipesInputDTO } from "../model/recipes/recipesDTO";

export class RecipesController{
    createUser = async (req: Request, res: Response) =>{
        try{
            const input: RecipesInputDTO={
                title: req.body.title,
                description: req.body.description,
                token: req.headers.authorization as string
            };

            const recipesBusiness = new RecipeBusiness()
            const token = await recipesBusiness.createRecipes(input) 
            
            res.status(201).send({message: "Usuário criado com sucesso", token})
        }catch(error:any){
            res.status(400).send(error.message || error.sqlMessage)
        }
    }
}
