"use client";
import { recipeSchemaZod, RecipeType } from "@/app/types/irecipe";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addarecipe } from "../services/recipeCrud";
import { useCategories } from "../hooks/useQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

const AddRecipe = () => {
  const [formData, setFormData] = useState<RecipeType>({
    name: "",
    category: "",
    img: "",
    ingredients: [""],
    instructions: "",
    favorite: false,
  });
  const { data } = useCategories();
  console.log("categoris:");
  console.log(data);

  const queryClient = useQueryClient();


  const [errors, setErrors] = useState<
    Partial<Record<keyof RecipeType, string>>
  >({});
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addIngredient = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: [...prevFormData.ingredients, ""],
    }));
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const updatedIngredients = [...formData.ingredients];

    updatedIngredients[index] = value;

    // וודא שיש לפחות אלמנט אחד ב־ingredients
    if (updatedIngredients.length === 0) {
      updatedIngredients.push("");
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
      try {
        addarecipe(formData);
        //עדכון הcash 
        queryClient.invalidateQueries({queryKey: ["recipes"]});

        toast.success("המתכון נוסף בהצלחה!", {
          onClose: () => router.push("/"), // ניתוב לדף הבית לאחר סגירת ההודעה
          autoClose: 2000, // סוגר אוטומטית את ההתראה אחרי 2 שניות
        });
      } catch (error) {
        toast.error(`אירעה שגיאה בעת הוספת המתכון. אנא נסה שוב. ${error}`, {
          autoClose: 2000,
        });
      }
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients:
        updatedIngredients.length > 0
          ? (updatedIngredients as [string, ...string[]])
          : [""], // טיפוס המבטיח לפחות אלמנט אחד
    });
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md m-3">
        <Link href="/" className="text-stone-900 mb-4 inline-block">
          &lt; Back
        </Link>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a recipe
        </h2>
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
            {errors.name && (
              <span className="text-red-600 text-sm">{errors.name}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">
              Category:
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
              >
                {data &&
                  data.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              {errors.category && (
                <span className="text-red-600 text-sm">{errors.category}</span>
              )}
            </label>
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
            {errors.img && (
              <span className="text-red-600 text-sm">{errors.img}</span>
            )}
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
                  <Image
                    src="https://img.icons8.com/?size=100&id=102315&format=png&color=000000"
                    alt="Delete Icon"
                    width={20} // גודל קטן לאייקון
                    height={20}
                  />
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
            {errors.ingredients && (
              <span className="text-red-600 text-sm">{errors.ingredients}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Instructions:</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 text-gray-800"
            />
            {errors.instructions && (
              <span className="text-red-600 text-sm">
                {errors.instructions}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default AddRecipe;
