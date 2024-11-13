import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };
    return (
        <nav className="bg-white text-gray-800 p-6 flex flex-col items-start">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-3xl font-semibold">Recipes</h1>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    id="search"
                    placeholder="Search recipes..."
                    className="p-2 text-lg rounded-l-md w-64 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-10"
                />

                <button className="bg-gray-200 text-gray-800 p-2 rounded-r-md h-10">
                    <SearchIcon className="h-5 w-5 text-gray-600" />
                </button>

                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-2 rounded-md border border-gray-300 ml-4 h-10"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category.toLowerCase()}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>



            {/* Buttons */}
            <div className="flex space-x-6 mt-6">
                <button
                    className={`text-lg ${activeTab === 'all' ? 'border-b-2 border-gray-800' : 'border-b-2 border-transparent'} pb-1 hover:border-b-2 hover:border-gray-400`}
                    onClick={() => setActiveTab('all')}
                >
                    All Recipes
                </button>
                <button
                    className={`text-lg ${activeTab === 'favorites' ? 'border-b-2 border-gray-800' : 'border-b-2 border-transparent'} pb-1 hover:border-b-2 hover:border-gray-400`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
