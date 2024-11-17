'use client'
import { useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { loginForToken } from "../services/userCrud";





const ConnectingModal = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>('');
  const router = useRouter();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const token = await loginForToken(email);
        if (token) {
            router.push("/pages/");
        } else {
            console.log("היתה בעיה בהתחברות. נסה שוב.");
            setError("היתה בעיה בהתחברות. נסה שוב.");
        }
    } 
    catch (error) {
      console.log(error);
    }
    finally{
        resetFields();
    }
  };


  const resetFields = () => {
    setEmail("");
    setError("");
  };



  return (
    <div className="class">
      <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 w-[30vw]">
        <h2 className="text-xl font-semibold text-gray-800">
          Connect
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              name="email"
              id="email"
              value={email}
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
            <p className="text-red-600 text-xs">{error}</p>
          <button
            type="submit"
            className="w-full mt-3 bg-purple-500 text-white py-1.5 rounded-md hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 text-sm"
          >
            Submit

          </button>
        </form>
      </div>
    </div>
  );
};

export default ConnectingModal;
