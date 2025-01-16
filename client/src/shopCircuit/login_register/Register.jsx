import React, { useContext, useRef, useState } from 'react'
import LinkTab from '../links/LinkTab'
import { IoIosClose } from 'react-icons/io'
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import { PRODUCT_CATEGORY } from '../categories/category';
import { registerAdmin, registerSeller } from '../Axios';
import Modal from '../modal/Modal';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../store/MyContext';




function Register() {
    const [number, setNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [exist, setExist] = useState(false);
    const registerModal = useRef();
    const navigate = useNavigate();
    const { isAdmin } = useContext(MyContext);

    // const [isDisabled, setIsDisabled] = useState(false);

    // const handleCategoryChange = (e) => {
    //     setCategory(e.target.value);
    //     setIsDisabled(e.target.value === 'SELECT THE CATEGORY...');
    //     console.log(e.target.value);
    // }

    const numberRegex = /^9\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleInputValiate = () => {
        setError(''); // Clear previous error
        if (number === '' || email === '' || password === '' || username === '' || category === '') {
            setError("Please provide value for all input fields");
            return false;
        } else if (!numberRegex.test(number)) {
            setError("Invalid number format");
            return false;
        } else if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return false;
        } else if (password.trim().length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        } else if (password.trim() !== conformPassword.trim()) {
            setError("Passwords do not match");
            return false;
        } else if (category === 'SELECT THE CATEGORY...') {
            setError("Select a category first");
            return false;
        } else {
            return true;
        }
    }

    const handleInputValiateForAdmin = () => {
        setError(''); // Clear previous error
        if (number === '' || email === '' || password === '' || username === '') {
            setError("Please provide value for all input fields");
            return false;
        } else if (!numberRegex.test(number)) {
            setError("Invalid number format");
            return false;
        } else if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return false;
        } else if (password.trim().length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        } else if (password.trim() !== conformPassword.trim()) {
            setError("Passwords do not match");
            return false;
        } else {
            return true;
        }
    }


     const handleAdminData = async () => {
            try {
                const result = await registerAdmin({
                    number,
                    username,
                    email,
                    password,
                    conformPassword
                });
                if(result.data === 'Email is already exist'){
                    setError("Email is already exist")
                    setExist(false)
                    return
                }else{
                    setExist(true)
                    registerModal.current.open();
                    return
                }
            } catch (error) {
                console.log(error);
            }
        }

    const handleSellerData = async (e) => {
        try {
            const createSeller = await registerSeller({
                number,
                username,
                email,
                password,
                conformPassword,
                category
            })
            if (createSeller.data === 'Email is already exist') {
                setError("Email is already exist")
                setExist(false)
                return
            } else {
                setExist(true)
                registerModal.current.open();
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRegisterModalClose = () => {
        registerModal.current.close();
        navigate('/')
    }




    return (
        <>
            <Modal ref={registerModal}>
                <div className='w-full p-4 relative h-40'>
                    <h1 className='text-xl mt-2 text-stone-300'>{!isAdmin ? `Your account has been registered.` : `Your account has been registered as admin.`}</h1>
                    <p className='text-stone-400 mt-4'>{!isAdmin ? `Soon, You will be approved by admin as a seller, Try to login after 24 hours.` : ``}</p>
                    <button onClick={handleRegisterModalClose} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>
            <div className='w-full h-full flex justify-center items-center'>
                <form className='p-4 border-2 bg-zinc-900 border-zinc-950 w-[30rem] rounded-md relative' onSubmit={(e) => e.preventDefault()}>
                    <LinkTab path='/'>
                        <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    </LinkTab>
                    <h1 className='text-2xl text-center text-stone-300 font-bold'>Register</h1>
                    <div className='mt-8 flex flex-col gap-3 justify-center'>
                        <span className='text-red-600'>{error}</span>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="number" placeholder='NUMBER....' onChange={(e) => setNumber(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><IoIosCall /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="text" placeholder='USERNAME....' onChange={(e) => setUsername(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaUser /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="text" placeholder='EMAIL....' onChange={(e) => setEmail(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><MdEmail /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="password" placeholder='PASSWORD....' onChange={(e) => setPassword(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaLock /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="password" placeholder='CONFORM PASSWORD....' onChange={(e) => setConformPassword(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaLock /></span>
                        </div>
                        {!isAdmin ? (
                            <div id='inputbox' className='flex flex-col relative'>
                            <select name="category" onChange={(e) => setCategory(e.target.value)} className='cursor-pointer py-2 px-4 border-2 border-zinc-300 text-stone-200 outline-none appearance-none rounded-md bg-zinc-800'>
                                {PRODUCT_CATEGORY.map((category) => {
                                    // console.log(category);
                                    return (
                                        <option key={category} className='' value={category}>{category}</option>
                                    )
                                })}
                            </select>
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><TiArrowSortedDown /></span>
                        </div>
                        ) : (
                            <></>
                        ) }
                        
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        <LinkTab path={exist ? '/' : '/register'} title='Register' handleOnClick={() => {
                            if (!isAdmin ? handleInputValiate() : handleInputValiateForAdmin()) {
                                !isAdmin ? handleSellerData() : handleAdminData()
                            }
                        }} style='py-2 px-4 uppercase text-center bg-blue-600 hover:bg-blue-800 rounded-md' />
                        <div className='flex justify-center items-center text-stone-300'>
                            <p>Already have an account?</p>
                            <LinkTab path='/login' title='Login' style='transition-all text-blue-600 px-2 text-xl hover:scale-110 font-bold' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register