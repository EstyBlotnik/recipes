"use client";
import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { useCategories } from "@/app/hooks/useQuery";

interface NavbarProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFavoriteToggle: (isFavorite: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearchChange,
  onCategoryChange,
  onFavoriteToggle,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data: categories } = useCategories();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  const toggleFavorites = () => {
    const newActiveTab = activeTab === "all" ? "favorites" : "all";
    setActiveTab(newActiveTab);
    onFavoriteToggle(newActiveTab === "favorites");
  };

  return (
    <nav className="bg-white text-gray-800 p-6 flex flex-col items-start">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold">Recipes</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto gap-4 sm:gap-6 mb-4 sm:mb-0">
        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={handleSearchChange}
            className="p-2 text-lg rounded-l-md w-full sm:w-64 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-10"
          />

          <button className="bg-gray-200 text-gray-800 p-2 rounded-r-md h-10">
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 rounded-md border border-gray-300 w-full sm:w-auto h-10"
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-6 mt-6">
        <button
          className={`text-lg ${
            activeTab === "all"
              ? "border-b-2 border-gray-800"
              : "border-b-2 border-transparent"
            } pb-1 hover:border-b-2 hover:border-gray-400`}
          onClick={() => {
            setActiveTab("all");
            onFavoriteToggle(false);
          }}
        >
          All Recipes
        </button>
        <button
          className={`text-lg ${
            activeTab === "favorites"
              ? "border-b-2 border-gray-800"
              : "border-b-2 border-transparent"
            } pb-1 hover:border-b-2 hover:border-gray-400`}
          onClick={toggleFavorites}
        >
          Favorites
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
