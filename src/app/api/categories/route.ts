export const dynamic = 'force-dynamic';

export async function GET() {
    const categories = [
       "Other",
    "Gluten-Free",
    "Dessert",
    "Healthy",
    "Main Course",
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