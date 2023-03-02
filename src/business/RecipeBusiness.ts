import { RecipeDatabase } from "../data/RecipeDatabase";
import { NotNullDescription, NotNullTitle } from "../error/RecipesError";
import { NotNullToken } from "../error/UserError";
import { Recipes } from "../model/recipes/recipes";
import { RecipesInputDTO } from "../model/recipes/recipesDTO";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/idGenerator";

const authenticator = new Authenticator()

export class RecipeBusiness{
    createRecipes =async (input:RecipesInputDTO) => {
        try{
            const {title, description, token} = input;

            if(!title){
                throw new NotNullTitle()
            }else if(!description){
                throw new NotNullDescription()
            }else if(!token){
                throw new NotNullToken()
            }

            const generatedId: string = generateId()

            const {id} = authenticator.getTokenData(token)


            const recipes:Recipes={
                id: generatedId,
                title,
                description,
                author_id: id
            }

            const recipeDatabase = new RecipeDatabase
            await recipeDatabase.createRecipe(recipes)

        }catch(error:any){
            throw new Error(error.message)
        }
    }
}