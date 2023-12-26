import React from 'react'
import { Link } from 'react-router-dom'
import { SiCrowdsource } from "react-icons/si";
import { connectWallet } from '../services/blockchain';
import { useGlobalState,truncate } from '../store';

 
function Header() {
  const [connectedAccount]= useGlobalState('connectedAccount');
  
  return (
    <header className='flex justify-between items-center p-5 bg-white shadow-lg fixed top-0 left-0 right-0'>
        <Link to="/" className='flex justify-start items-center text-xl space-x-1'>
          <SiCrowdsource className=' ml-9' size={21}/>
          <span className='font-bold'>Better World</span>
        </Link>

        <div className='flex space-x-2 justify-center'>
          {connectedAccount ? (
            <button 
            type='button'
            className='px-5 py-3 bg-green-600 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700'>
            {truncate(connectedAccount, 4, 4, 11)}
            </button>
          ):(
            <button 
                type='button'
                className='px-5 py-3 bg-green-600 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700'
                onClick={connectWallet}>
                CONNECT WALLET</button>
          )}
        </div>
    </header>
  )
}

export default Header