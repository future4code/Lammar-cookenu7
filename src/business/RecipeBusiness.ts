import { RecipeDatabase } from "../data/RecipeDatabase";
import { NotNullDescription, NotNullTitle } from "../error/RecipesError";
import { Recipes } from "../model/recipes/recipes";
import { RecipesInputDTO } from "../model/recipes/recipesDTO";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/idGenerator";

const authenticator = new Authenticator()

export class RecipeBusiness{
    createRecipes =async (input:RecipesInputDTO) => {
        try{
            const {title, description,} = input;

            if(!title){
                throw new NotNullTitle()
            }else if(!description){
                throw new NotNullDescription()
            }

            const id: string = generateId()

            const recipes:Recipes={
                id,
                title,
                description,
            }

            const recipeDatabase = new RecipeDatabase
            await recipeDatabase.createRecipe(recipes)

            const token = authenticator.generateToken({id: recipes.id})

            return token

        }catch(error:any){
            throw new Error(error.message)
        }
    }
}