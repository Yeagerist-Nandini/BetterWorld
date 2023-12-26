import React from 'react'
import { setGlobalState, useGlobalState } from '../store'


function Hero() {
    const [stats]=useGlobalState('stats');

    return (
        <div className='text-center bg-white text-gray-800 py-24 px-6'>
            <h1 className='text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12'>
                <span className='capitalize'>Make a Difference.</span>
                <br/>
                <span className='capitalize'>Fund a</span>
                <br />
                <span className='text-green-600'>Better World.</span>
            </h1>
            <div className='flex justify-center items-center space-x-2'>
                <button
                    type='button'
                    className='px-5 py-3 bg-green-600 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700'
                    onClick={() => setGlobalState('createModal','scale-100')}>
                    ADD PROJECT</button>
                <button
                    type='button'
                    className='px-5 py-3 border border-green-600 bg-white text-green-600 font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700 hover:text-white'>
                    BACK PROJECTS</button>
            </div>

            <div className='flex justify-center items-center mt-10'>
                <div className='flex flex-col justify-center items-center h-20 border shadow-md w-full'>
                    <span className='text-lg font-bold text-green-900'> {stats?.totalProjects || 0}</span>
                    <span>Projects</span>
                </div>

                <div className='flex flex-col justify-center items-center h-20 border shadow-md w-full'>
                    <span className='text-lg font-bold text-green-900'> {stats?.totalBacking || 0}</span>
                    <span>Backings</span>
                </div>

                <div className='flex flex-col justify-center items-center h-20 border shadow-md w-full'>
                    <span className='text-lg font-bold text-green-900'>{stats?.totalDonations || 0} ETH</span>
                    <span>Donated</span>
                </div>

            </div>
        </div>
    )
}

export default Hero




// 