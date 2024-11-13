"use client";
import { recipeSchemaZod, RecipeType } from '@/app/types/irecipe';
import React, { useState } from 'react';
const AddRecipe = () => {
    const [formData, setFormData] = useState<RecipeType>({
        name: '',
        category: '',
        img: '',
        ingredients: [''],
        instructions: '',
        favorite: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof RecipeType, string>>>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addIngredient = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: [...prevFormData.ingredients, ''], // הוספת רכיב ריק
        }));
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const updatedIngredients = [...formData.ingredients];

        updatedIngredients[index] = value;

        // וודא שיש לפחות אלמנט אחד ב־ingredients
        if (updatedIngredients.length === 0) {
            updatedIngredients.push('');
        }

        setFormData({
            ...formData,
            ingredients: updatedIngredients as [string, ...string[]], // טיפוס המבטיח לפחות אלמנט אחד
        });
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ביצוע ולידציה באמצעות Zod
        const validationResult = recipeSchemaZod.safeParse(formData);

        if (!validationResult.success) {
            // עדכון הודעות השגיאה במידה והוולידציה נכשלה
            const fieldErrors: Partial<Record<keyof RecipeType, string>> = {};
            validationResult.error.errors.forEach((error) => {
                if (error.path[0]) {
                    fieldErrors[error.path[0] as keyof RecipeType] = error.message;
                }
            });
            setErrors(fieldErrors);
        } else {
            // אם הוולידציה הצליחה, אפשר לשלוח את הנתונים לשרת או לבצע פעולה אחרת
            console.log("הנתונים תקינים:", validationResult.data);
            setErrors({}); // איפוס הודעות שגיאה
        }

        console.log("all data", formData)
    };
    const removeIngredient = (index: number) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients.splice(index, 1);
        setFormData({
            ...formData,
            ingredients: updatedIngredients.length > 0 ? updatedIngredients as [string, ...string[]]: [''], // טיפוס המבטיח לפחות אלמנט אחד
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add a recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Recipe Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
                </div>

                <div>
                    <label className="block text-gray-700">Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.category && <span className="text-red-600 text-sm">{errors.category}</span>}
                </div>

                <div>
                    <label className="block text-gray-700">Image URL:</label>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.img && <span className="text-red-600 text-sm">{errors.img}</span>}
                </div>

                <div>
                    <label className="block text-gray-700">Ingredients:</label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(e, index)}
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                            />
                            <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="ml-2 text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIngredient}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Add Ingredient
                    </button>
                    {errors.ingredients && <span className="text-red-600 text-sm">{errors.ingredients}</span>}
                </div>

                <div>
                    <label className="block text-gray-700">Instructions:</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.instructions && <span className="text-red-600 text-sm">{errors.instructions}</span>}
                </div>

                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition duration-300">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddRecipe;