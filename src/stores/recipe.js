import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/firebase.js";
import { ref as dbRef, get, push, set, remove, update } from "firebase/database";

export const useRecipeStore = defineStore("recipe", () => {
    const recipes = ref([]);
    const recipeDetail = ref({});

    const getRecipesData = async () => {
        try {
            const recipesRef = dbRef(db, "recipes");

            const snapshot = await get(recipesRef);

            if (snapshot.exists()) {
                const data = snapshot.val();

                // Ini wajib untuk merubah object menjadi array biar bisa di looping
                const formattedData = Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key
                }));

                recipes.value = formattedData;
            } else {
                recipes.value = [];
            }
        } catch (error) {
            console.error("Error fetching recipes data:", error);
        }
    };

    const addRecipe = async (newRecipe) => {
        try {
            const recipesRef = dbRef(db, "recipes");

            const newRecipeRef = push(recipesRef);

            await set(newRecipeRef, newRecipe);

            await getRecipesData();
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    }

    const getRecipeDetail = async (id) => {
        try {
            const snapshot = await get(dbRef(db, `recipes/${id}`));

            if (snapshot.exists()) {
                const data = snapshot.val();
                recipeDetail.value = { ...data, id: id };
            } else {
                recipeDetail.value = {};
            }
        } catch (error) {
            console.error("Error fetching recipe detail:", error);
        }
    }

    const deleteRecipe = async (id) => {
        try {
            await remove(dbRef(db, `recipes/${id}`));
            await getRecipesData();
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    }

    const updateRecipe = async (id, updatedData) => {
        try {
            await update(dbRef(db, `recipes/${id}`), updatedData);
            await getRecipesData();
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    }

    return {
        recipes,
        recipeDetail,
        getRecipesData,
        addRecipe,
        getRecipeDetail,
        deleteRecipe,
        updateRecipe,
    };
});