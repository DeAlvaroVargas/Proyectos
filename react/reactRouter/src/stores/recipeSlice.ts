import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type {Categories, Drinks, SearchFilter, Drink, SelectedRecipe} from '../types'
import { FavoritesSliceType } from "./favoritesSlice"



export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: SelectedRecipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
    setSelectedRecipe: () => void
}
export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {   
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as SelectedRecipe ,
    modal: false,
    fetchCategories: async () => {
        const categoriesFetch = await getCategories()
        set({
        categories: categoriesFetch
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({drinks}) 
        },
    selectRecipe: async(id) => {
        const recipe = await getRecipeById(id)
        set({
            selectedRecipe:recipe,
            modal: true
        })
        console.log(recipe)
    },
    closeModal: () => {
        set({
            modal: false,
        })
    },
    setSelectedRecipe: () => {
        set({ selectedRecipe: {} as SelectedRecipe 
            });
        }
})
