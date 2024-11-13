import axios from 'axios';
import { RecipeType } from '@/app/types/irecipe';

const apiUrl = 'http://localhost:3000/api/recipePost';
// const fetchRecipes = async (search, category, favorite) => {
//     // בניית ה-URL עם פרמטרים
//     const queryParams = new URLSearchParams();

//     if (search) queryParams.append('search', search);
//     if (category) queryParams.append('category', category);
//     if (favorite) queryParams.append('favorite', favorite);

//     const url = `/api/recipes?${queryParams.toString()}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(data); // הנתונים שהוחזרו מה-API
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };
export const addBook = async (formData:RecipeType) => {
    try {
        const response = await axios.post(apiUrl, formData);
        return response.data;
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error; 
    }
};
