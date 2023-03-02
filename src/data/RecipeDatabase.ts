import { CustomError } from "../error/CustomError"
import { Unauthorized, UserNotFound } from "../error/UserError"
import { GetRecipes } from "../model/recipes/getRecipes"
import { Recipes } from "../model/recipes/recipes"
import { BaseDatabase } from "./BaseDatabase"

export class RecipeDatabase extends BaseDatabase{
    createRecipe = async(recipes:Recipes):Promise<void>=>{
        try{
            const queryResult = await RecipeDatabase.connection
            .insert({
                id: recipes.id,
                title:recipes.title,
                description: recipes.description,
                author_id: recipes.author_id
            }).into("Recipes_Cookenu")

            if(queryResult.length <1){
                throw new Unauthorized();
            }

        }catch(error:any){
            throw new Error(error.message)
        }
    }

    getRecipe = async(input: GetRecipes)=>{
        try{
            const queryResult = await RecipeDatabase.connection("Recipes_Cookenu")
            .select("*")
            .where({id: input.id})


            if(queryResult.length <1){
                throw new UserNotFound
            }
            return queryResult
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }
}