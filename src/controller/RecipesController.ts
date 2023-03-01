import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { CustomError } from "../error/CustomError";
import { GetRecipes } from "../model/recipes/getRecipes";
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
            
            res.status(201).send({message: "Receita criada com sucesso", token})
        }catch(error:any){
            res.status(400).send(error.message || error.sqlMessage)
        }
    }

    getRecipe = async(req: Request, res:Response)=>{
        try{
            const {id} = req.params
            

            const recipeDatabase = new RecipeDatabase()
            const recipe = await recipeDatabase.getRecipe(id)


            res.status(201).send(recipe)
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message);
        }
    }
}
