import React from 'react'
import Identicon from 'react-hooks-identicons';
import { FaEthereum } from "react-icons/fa";
import { daysRemaining, getGlobalState, setGlobalState, useGlobalState } from '../store';
import { truncate } from '../store';
import { payoutProject } from '../services/blockchain';


function ProjectDetail({project}) {
    // console.log(project);
    const [connectedAccount] = useGlobalState('connectedAccount');
    const expired = new Date().getTime() > Number(project?.expiresAt + '000');

    return (
        <div className='py-24 px-6 flex justify-center'>
            <div className='flex flex-col justify-center md:w-2/3'>
                <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
                    <img
                        src={project?.imageURL}
                        alt={project?.title}
                        className='rounded-xl h-64 w-full sm:w-1/3 object-cover'
                    />
 
                    <div className='flex-1 sm:py-0 py-4'>
                        <div className='flex flex-col justify-start flex-wrap'>
                            <h5 className='text-gray-900 text-xl font-medium mb-2'>{project?.title}</h5>
                            <small className="text-gray-500">
                                {expired ? 'Expired' : daysRemaining(project?.expiresAt) + ' left'}
                            </small>
                        </div>

                        <div className='flex justify-between items-center w-full pt-1'>
                            <div className='flex justify-start space-x-2'>
                                <Identicon 
                                className="h-10 w-10 object-contain rounded-full shadow-md" 
                                string={project?.owner} 
                                size={15}/>
                                <small className='text-gray-700'>{truncate(project?.owner, 4, 4, 11)}</small>
                                <small className='text-gray-500 font-bold'>{project?.backers} Backings</small>
                            </div>

                            <div className='font-bold'>
                                {expired ? (
                                    <small className="text-red-500">Expired</small>
                                ) : project?.status == 0 ? (
                                    <small className="text-gray-500">Open</small>
                                ) : project?.status == 1 ? (
                                    <small className="text-green-500">Accepted</small>
                                ) : project?.status == 2 ? (
                                    <small className="text-gray-500">Reverted</small>
                                ) : project?.status == 3 ? (
                                    <small className="text-red-500">Deleted</small>
                                ) : (
                                    <small className="text-orange-500">Paid</small>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-light mt-2">{project?.description}</p>
                            <div className="w-full overflow-hidden bg-gray-300 mt-4">
                                <div
                                    className="bg-green-600 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-l-full h-1 overflow-hidden max-w-full"
                                    style={{ width: `${(project?.raised / project?.cost) * 100}%`, }}>
                                </div>
                            </div>

                            <div className="flex justify-between items-center font-bold mt-2">
                                <small>{project?.raised} ETH Raised</small>
                                <small className="flex justify-start items-center">
                                    <FaEthereum />
                                    <span>{project?.cost} ETH</span>
                                </small>
                            </div>

                            <div className='flex justify-start items-center space-x-2 mt-4'>
                                {project?.status == 0 ? (
                                    <button
                                        type='button'
                                        onClick={() => setGlobalState('backModal', 'scale-100')}
                                        className='px-5 py-3 bg-green-600 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700'>
                                        BACK PROJECT
                                    </button>
                                ) : null}

                                {connectedAccount == project?.owner ? (
                                    project?.status != 3 ? (
                                        project?.status == 1 ? (
                                            <button
                                                type='button'
                                                onClick={payoutProject(project?.id)}
                                                className='px-5 py-3 bg-orange-600 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700'>
                                                PAYOUT
                                            </button>
                                        ) : project?.status != 4 ? (
                                            <>
                                                <button
                                                    type='button'
                                                    className='px-5 py-3 bg-gray-600 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700'
                                                    onClick={() => setGlobalState('updateModal', 'scale-100')}>
                                                    EDIT
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={() => setGlobalState('deleteModal', 'scale-100')}
                                                    className='px-5 py-3 bg-red-600 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-green-700'>
                                                    DELETE
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                className="inline-block px-6 py-2.5 bg-gray-600
                                        text-white font-medium text-xs leading-tight uppercase
                                        rounded-full shadow-md hover:bg-gray-700"
                                            >
                                                Project Closed
                                            </button>
                                        )
                                    ) : null
                                ) : null}



                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail