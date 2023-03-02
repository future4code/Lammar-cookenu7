import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { CustomError } from "../error/CustomError";
import { Unauthorized } from "../error/UserError";
import { EditRecipesInputDTO } from "../model/recipes/editReceitaInputDTO";
import { GetRecipes } from "../model/recipes/getRecipes";
import { RecipesInputDTO } from "../model/recipes/recipesDTO";
import { UserRole } from "../model/user/userRole";
import { Authenticator } from "../services/Authenticator";

const authenticator = new Authenticator()

export class RecipesController{
    createRecipes = async (req: Request, res: Response) =>{
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

            const input: GetRecipes={
                id: req.params.id,
                token: req.headers.authorization as string
            }            

            const recipeDatabase = new RecipeDatabase()
            const recipe = await recipeDatabase.getRecipe(input)


            res.status(200).send(recipe)
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message);
        }
    }

    editRecipe = async(req: Request, res: Response) =>{
        try{
            const input: EditRecipesInputDTO ={
                title: req.body.title,
                description: req.body.description,
                token: req.headers.authorization as string,
                id: req.params.id,
            };

            const recipesBusiness = new RecipeBusiness()
            await recipesBusiness.editRecipe(input)
            res.status(201).send({message: "Receita alterada!"})

        }catch(error:any){
            res.status(400).send(error.message)
        }
    }

    deleteRecipe = async(req: Request, res: Response)=>{
        try{
            const input: GetRecipes={
                id: req.params.id,
                token: req.headers.authorization as string
            }
            
            const data = authenticator.getTokenData(input.token);

            if(data.role.toUpperCase() != UserRole.ADMIN){
                res.status(400).send("Usuário não autorizado")
            }

            if(!data.id){
                throw new Unauthorized()
            }
            
            const recipeDatabase = new RecipeDatabase()
            await recipeDatabase.deleteRecipe(input)
            res.status(200).send("Receita deletada com sucesso!")
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message);

        }
    }
}
