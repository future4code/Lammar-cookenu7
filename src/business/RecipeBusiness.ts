import { RecipeDatabase } from "../data/RecipeDatabase";
import { CustomError } from "../error/CustomError";
import { NotNullDescription, NotNullTitle } from "../error/RecipesError";
import { NotNullToken } from "../error/UserError";
import { GetRecipes } from "../model/recipes/getRecipes";
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

    getRecipe = async (input:GetRecipes) =>{
        try{
            const {token} = input;

            if(!token){
                throw new NotNullToken();
            }

            const {id} = authenticator.getTokenData(token)

            const recipeDatabase = new RecipeDatabase();
            await recipeDatabase.getRecipe(id);
        }catch(error:any){
            throw new CustomError(400, error.message)
        }
    }
}