export async function GET() {
    const categories = [
        "Vegan",
        "Gluten-Free",
        "Dessert",
        "Vegetarian",
        "Low Carb",
        "Paleo",
        "Keto",
        "Dairy-Free",
        "Nut-Free",
        "Quick & Easy",
        "Healthy",
        "Appetizer",
        "Main Course",
        "Side Dish",
        "Soup",
        "Salad",
        "Beverage",
        "Breakfast",
        "Lunch",
        "Dinner"
    ];
    return new Response(JSON.stringify(categories), {
        status: 200,
    });
}