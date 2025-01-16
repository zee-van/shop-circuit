import React, { useRef, useState } from 'react'
import './style.css';
import LinkTab from '../links/LinkTab'
import { IoIosClose } from 'react-icons/io'
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { registerAdmin } from '../Axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

function AdminRegister() {
    const [number, setNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [error, setError] = useState('');
    const [exist, setExist] = useState(false);
    const registerModal = useRef();
    const navigate = useNavigate();

    
    const numberRegex = /^9\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleInputValiate = () => {
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
            console.log('Registration success', result);
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

    const handleRegisterModalClose = () => {
        registerModal.current.close();
        navigate('/')
    }


    // const handleCloseModel = () => {
    //     numberModal.current.close();
    //     emailModal.current.close();
    //     passwordModal.current.close();
    // }

    return (
        <>
         <Modal ref={registerModal}>
                <div className='w-full p-4 relative h-40'>
                    <h1 className='text-xl mt-2 text-stone-300'>Your account has been registered as admin.</h1>
                    <p className='text-stone-400 mt-4'></p>
                    <button onClick={handleRegisterModalClose} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>
            <div className='w-full h-full flex justify-center items-center'>
                <form method='post' action='/adminregister' className='p-4 border-2 bg-zinc-900 border-zinc-950 w-[30rem] rounded-md relative'>
                    <LinkTab path='/'>
                        <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    </LinkTab>
                    <h1 className='text-2xl text-center text-stone-300 font-bold'>Register</h1>
                    <div className='mt-8 flex flex-col gap-3 justify-center'>
                        <span className='text-red-600'>{error}</span>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="text" placeholder='NUMBER....' name='number' onChange={(e) => setNumber(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' required />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><IoIosCall /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="text" placeholder='USERNAME....' name='username' onChange={(e) => setUsername(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' required />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaUser /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="text" placeholder='EMAIL....' name='email' onChange={(e) => setEmail(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' required />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><MdEmail /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="password" placeholder='PASSWORD....' name='password' onChange={(e) => setPassword(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' required />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaLock /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="password" placeholder='CONFORM PASSWORD....' name='conformPassword' onChange={(e) => setConformPassword(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' required />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaLock /></span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        <LinkTab path={exist ? '/' : '/adminregister'} handleOnClick={() => {
                            if (handleInputValiate()) {
                                handleAdminData();
                            }
                        }} title='Register' style='py-2 px-4 uppercase text-center bg-blue-600 hover:bg-blue-800 rounded-md' />
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

export default AdminRegister