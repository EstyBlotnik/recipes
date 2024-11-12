import { RecipeType } from "@/app/types/irecipe";
import RecipeCard from "@/app/components/RecipeCard"

// should recive the arrey of recepies
// paginathion logic here?
export default function RecipeGrid() {
   
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {demoRecipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
}


 const demoRecipes: RecipeType[] = [
    {
        name: "אוכל טעים",
        category: "breakfast",
        img: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
        ingredients: ["חלב", "ביצים"],
        instructions: "חילחילח ל ליחלךחלך חךלחךלחילח לחיווווו וווווווווחילחי למתכון",
        favorite: true
    },
    {
      name: "אוכל טעים 2",
      category: "lunch",
      img: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: ["קמח", "שמן"],
      instructions: "הוראות למתכון 2",
      favorite: false,
    },
    {
        name: "אוכל טעים",
        category: "breakfast",
        img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
        ingredients: ["חלב", "ביצים"],
        instructions: "חילחילח ל ליחלךחלך חךלחךלחילח לחיווווו וווווווווחילחי למתכון",
        favorite: true
    },
    {
      name: "אוכל טעים 2",
      category: "lunch",
      img: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: ["קמח", "שמן"],
      instructions: "הוראות למתכון 2",
      favorite: false,
    },
    {
        name: "אוכל טעים",
        category: "breakfast",
        img: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600",
        ingredients: ["חלב", "ביצים"],
        instructions: "חילחילח ל ליחלךחלך חךלחךלחילח לחיווווו וווווווווחילחי למתכון",
        favorite: true
    },
    {
      name: "אוכל טעים 2",
      category: "lunch",
      img: "https://images.pexels.com/photos/708488/pexels-photo-708488.jpeg?auto=compress&cs=tinysrgb&w=400",
      ingredients: ["קמח", "שמן"],
      instructions: "הוראות למתכון 2",
      favorite: false,
    },
    // Add additional recipes as needed
  ];