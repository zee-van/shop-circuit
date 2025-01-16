import React, { useRef, useState } from 'react'
import { PRODUCT_CATEGORY } from '../categories/category'
import { FaLock, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoIosCall, IoIosClose } from 'react-icons/io'
import { TiArrowSortedDown } from 'react-icons/ti'
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
import Button from '../buttons/Button'
import LinkTab from '../links/LinkTab'
import { yourRequirement } from '../Axios'
import Modal from '../modal/Modal'

function UserPost() {
    const [number, setNumber] = useState('');
    const [username, setUsername] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [showImage, setShowImage] = useState(null);
    const [image, setImage] = useState(null);
    const [imageStyle, setImageStyle] = useState('hidden')
    const requirementSuccessModal = useRef();

    const numberRegex = /^9\d{9}$/;


    const handleInputValiate = () => {
        setError(''); // Clear previous error
        if (number === '' || productName === '' || category === '' || username === '' || price === '') {
            setError("Please provide value for not optional input fields");
            return false;
        } else if (!numberRegex.test(number)) {
            setError("Invalid number format");
            return false;
        } else if (category === 'SELECT THE CATEGORY...') {
            setError("Select a category first");
            return false;
        } else {
            return true;
        }
    }

    const handleShowImage = (e) => {
        setImageStyle('w-1/3')
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setShowImage(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setShowImage(null);
        }
    }

    const handleRequirementSuccessModalOpen = () => {
        requirementSuccessModal.current.open();
        // setTimeout(() => {
        //     requirementSuccessModal.current.close();
        // }, 3000);
    }

    const handleYourRequirement = async (e) => {
        try {
            const requiremtnt = await yourRequirement({
                number,
                username,
                productName,
                price,
                location,
                category,
                image,
                description
            })
            console.log(requiremtnt);
        } catch (error) {
            console.log(error)
        }
    }

    const handleRequirementSuccessModalClose = () => {
        requirementSuccessModal.current.close();
    }


    let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'
    return (
        <>
            <Modal ref={requirementSuccessModal}>
                <div className='w-full p-4 relative h-40'>
                    <h1 className='text-xl mt-2 text-stone-300'>Post completed Successfully.</h1>
                    <p className='text-stone-400 mt-4'>Soon, You will get the feedback of your requirement(post) from seller.</p>
                    <button onClick={handleRequirementSuccessModalClose} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>
            <div className='text-center text-stone-400 my-4'>
                <h1 className='text-2xl'>Feel free to post your rquirement.</h1>
                <p>Here you can post your requirements, with following input fields.</p>
                <p>Don't forget to provide <strong>image</strong>, As well as <strong>category</strong>, So that seller can recognized the product effectively.</p>
            </div>
            <div className='flex justify-center gap-4 w-full items-center'>
                <div className={imageStyle}>
                    {image && <img className='w-full rounded-md aspect-square object-cover' src={showImage} alt="image" />}                            <div className='mt-2'>
                    </div>
                </div>
                <div className='flex items-center flex-col gap-4'>
                    <form method='post' onSubmit={(e) => e.preventDefault()} encType='multipart/form-data' className='p-4 bg-zinc-900 border-zinc-950 rounded-md w-[30rem]'>
                        <LinkTab path='/'>
                            <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                        </LinkTab>
                        <div className='flex flex-col w-full mt-4 gap-4'>
                            <span className='text-red-600'>{error}</span>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input type="number" placeholder='NUMBER....' onChange={(e) => setNumber(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-700' />
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><IoIosCall /></span>
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input type="text" placeholder='USERNAME....' onChange={(e) => setUsername(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-700' />
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaUser /></span>
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input type="text" placeholder='PRODUCT NAME' onChange={(e) => setProductName(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-700' />
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><AiFillProduct /></span>
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input type="number" placeholder='LIMIT PRICE....' onChange={(e) => setPrice(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-700' />
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><TbCurrencyRupeeNepalese /></span>
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input type="text" placeholder='LOCATION....(optional)' onChange={(e) => setLocation(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-700' />
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaLocationDot /></span>
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <select name="category" onChange={(e) => setCategory(e.target.value)} className='cursor-pointer py-2 px-4 border-2 border-zinc-300 text-stone-200 outline-none appearance-none rounded-md bg-zinc-700'>
                                    {PRODUCT_CATEGORY.map((category) => {
                                        // console.log(category);
                                        return (
                                            <option key={category} className='' value={category}>{category}</option>
                                        )
                                    })}
                                </select>
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><TiArrowSortedDown /></span>
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-700' type="file" accept="image/*" onChange={handleShowImage} />
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><MdInsertPhoto /></span>
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <textarea type="text" placeholder='DESCRIPTION....(optional)' onChange={(e) => setDescription(e.target.value)} className='py-2 px-4 pr-8 resize-none rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-700' />
                                <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><MdDescription /></span>
                            </div>
                            <div className='flex gap-6'>
                                <Button handleOnClick={() => {
                                    if (handleInputValiate()) {
                                        handleYourRequirement();
                                        handleRequirementSuccessModalOpen();
                                    }
                                }} title={'Post'} btnStyle={btnNormal}></Button>
                                <LinkTab title={'Cancel'} path={'/'} style={btnNormal}></LinkTab>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserPost