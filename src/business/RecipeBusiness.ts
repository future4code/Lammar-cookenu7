import { RecipeDatabase } from "../data/RecipeDatabase";
import { CustomError } from "../error/CustomError";
import { NotNullDescription, NotNullTitle } from "../error/RecipesError";
import { NotNullToken, Unauthorized } from "../error/UserError";
import { EditRecipesInput } from "../model/recipes/editReceitaInput ";
import { EditRecipesInputDTO } from "../model/recipes/editReceitaInputDTO";
import { Recipes } from "../model/recipes/recipes";
import { RecipesInputDTO } from "../model/recipes/recipesDTO";
import { UserRole } from "../model/user/userRole";
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

    editRecipe =async (input:EditRecipesInputDTO) => {
        try{
            const {title, description, token, id} = input;

            if(!title){
                throw new NotNullTitle()
            }else if(!description){
                throw new NotNullDescription()
            }else if(!token){
                throw new NotNullToken()
            }else if(!id){
                throw new Error("Insira o id")
            }

            const data = authenticator.getTokenData(token);

            if(data.role.toUpperCase() != UserRole.NORMAL){
                throw new Unauthorized()
            }

            if(!data.id){
                throw new Unauthorized()
            }

            const editRecipeInput: EditRecipesInput={
                id,
                title,
                description,
            };

            const recipeDatabase = new RecipeDatabase()
            await recipeDatabase.editRecipe(editRecipeInput)

        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }
}