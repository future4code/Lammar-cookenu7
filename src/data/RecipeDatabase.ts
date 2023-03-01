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
            }).into("Receitas_Cookenu")
        }catch(error:any){
            throw new Error(error.message)
        }
    }
}