import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { setGlobalState } from '../store'

function AddButton() {
  return (
    <div className='fixed right-10 bottom-10 flex space-x-2 justify-center items-center'>
      <button 
      type='button'
      className='flex justify-center items-center w-9 h-9 bg-green-600
      text-white font-medium text-xs leading-tight uppercase
      rounded-full shadow-md hover:bg-green-700'
      onClick={() => setGlobalState('createModal','scale-100')}>
        <BsPlusLg className='font-bold' size={20} />
      </button>
        
    </div>
  )
}

export default AddButton