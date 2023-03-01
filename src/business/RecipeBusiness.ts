import { RecipeDatabase } from "../data/RecipeDatabase";
import { NotNullAuthor_id, NotNullDescription, NotNullTitle } from "../error/RecipesError";
import { Recipes } from "../model/recipes/recipes";
import { RecipesInputDTO } from "../model/recipes/recipesDTO";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/idGenerator";

const authenticator = new Authenticator()

export class RecipeBusiness{
    createRecipes =async (input:RecipesInputDTO) => {
        try{
            const {title, description, author_id} = input;

            if(!title){
                throw new NotNullTitle()
            }else if(!description){
                throw new NotNullDescription()
            }else if(!author_id){
                throw new NotNullAuthor_id()
            }

            const id: string = generateId()

            const recipes:Recipes={
                id,
                title,
                description,
                author_id
            }

            const recipeDatabase = new RecipeDatabase
            await recipeDatabase.createRecipe(recipes)

            const token = authenticator.generateToken({id})

            return token

        }catch(error:any){
            throw new Error(error.message)
        }
    }
}