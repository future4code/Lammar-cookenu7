import { CustomError } from "../error/CustomError"
import { UserNotFound } from "../error/UserError"
import { Recipes } from "../model/recipes/recipes"
import { BaseDatabase } from "./BaseDatabase"

export class RecipeDatabase extends BaseDatabase{
    createRecipe = async(recipes:Recipes):Promise<void>=>{
        try{
            await RecipeDatabase.connection
            .insert({
                id: recipes.id,
                title:recipes.title,
                description: recipes.description
            }).into("Recipes_Cookenu")
        }catch(error:any){
            throw new Error(error.message)
        }
    }

    getRecipe = async(id:string)=>{
        try{
            const queryResult = await RecipeDatabase.connection("Recipes_Cookenu")
            .select("*")
            .where({id})


            if(queryResult.length <1){
                throw new UserNotFound
            }
            return queryResult
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }
}