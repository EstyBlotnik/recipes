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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
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
    };
    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add a recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">recipe name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
                </div>

                <div>
                    <label className="block text-gray-700">category</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.category && <span className="text-red-600 text-sm">{errors.category}</span>}
                </div>
                <div>
                    <label className="block text-gray-700">img url:</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.img}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.img && <span className="text-red-600 text-sm">{errors.img}</span>}
                </div>

                <div>
                    <label className="block text-gray-700">ingredients:</label>
                    <input
                        type="text"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    <button
                        type="button"
                        // onClick={addIngredient}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        הוסף רכיב
                    </button>
                    {errors.ingredients && <span className="text-red-600 text-sm">{errors.ingredients}</span>}

                    {/* הצגת רכיבים שנוספו */}
                    <ul className="mt-2">
                        {formData.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex justify-between items-center">
                                {ingredient}
                                <button
                                    type="button"
                                    // onClick={() => removeIngredient(index)}
                                    className="ml-2 text-red-600"
                                >
                                    מחק
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <label className="block text-gray-700">instructions:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    {errors.instructions && <span className="text-red-600 text-sm">{errors.instructions}</span>}
                </div>

                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition duration-300">
                    הרשמה
                </button>
            </form>
        </div>
    );

}

export default AddRecipe;