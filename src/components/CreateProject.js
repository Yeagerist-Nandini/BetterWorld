import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store'
import { createProject } from '../services/blockchain'
import { toast } from 'react-toastify'


function CreateProject() {
    const [createModal] = useGlobalState('createModal')
    const [title, setTitle] = useState('');
    const [amount,setAmount] = useState('');
    const [date, setDate] = useState('');
    const [imageURL,setImageURL] = useState('');
    const [description,setDescription] = useState('');

    const toTimestamp= (dateStr)=>{
        const dateObj=Date.parse(dateStr);
        return dateObj/1000;
    }
 
    const handleSubmit= async(e) =>{
        e.preventDefault();

        if(!title || !description || !amount || !date || !imageURL) return;

        const cost=amount;
        const params={
            title,
            description,
            imageURL,
            cost,
            expiresAt:toTimestamp(date),
        }

        await createProject(params);
        toast.success('Project Created Succesfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        // console.log(params);
        onClose();
    }

    const onClose= ()=>{
        setGlobalState('createModal','scale-0');
        reset();
    }

    const reset = () => {
        setTitle('')
        setAmount('')
        setDescription('')
        setImageURL('')
        setDate('')
    }
    

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50
            transform transition-transform duration-300 ${createModal}`}>

            <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col"
                    onSubmit={handleSubmit}>        
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Add Project</p>
                        <button
                            onClick={onClose}
                            type="button"
                            className="border-0 bg-transparent focus:outline-none">
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <div className="rounded-xl overflow-hidden h-20 w-20">
                            <img
                                src={
                                    imageURL || 
                                    'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'}
                                alt="project title"
                                className="h-full w-full object-cover cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <input
                            className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0 p-2.5"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e)=>setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <input
                            className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0 p-2.5"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="amount"
                            placeholder="Amount (ETH)"
                            onChange={(e)=>setAmount(e.target.value)}
                            value={amount}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <input
                            className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0 p-2.5"
                            type="date"
                            name="date"
                            placeholder="Expires"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <input
                            className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0 p-2.5"
                            type="url"
                            name="imageURL"
                            placeholder="Image URL"
                            onChange={(e) => setImageURL(e.target.value)}
                            value={imageURL}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <textarea
                            className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0 p-5"
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="inline-block px-6 py-2.5 bg-green-600
          text-white font-medium text-md leading-tight
          rounded-full shadow-md hover:bg-green-700 mt-5">
                        Submit Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject