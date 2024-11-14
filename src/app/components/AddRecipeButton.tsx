"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const AddRecipe = () => {
  const router = useRouter()
  return (
    <div className='m-5'>
      <button className="button" onClick={() => router.push('/pages/AddRecipe')}>Add Recipe</button>
    </div>
  )
}

export default AddRecipe