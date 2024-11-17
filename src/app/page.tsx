import React from 'react'
import ConnectingModal from './components/ConnectingModal'
import '../app/globals.css'

const page = () => {
  return (
    <div>
      <div className='bg-sky-600 fixed top-0 w-full h-[13vh] flex flex-row justify-between font-bold items-center text-white p-3 z-10'>
        <div className='font-serif text-base'>
          My Recipes
        </div>
      </div>
    <div className="paging">
    <ConnectingModal/>
    </div>
    </div>
  )
}

export default page