import React, { useEffect, useState } from 'react'
import './style.css'
import { IoIosCall, IoIosClose } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import LinkTab from '../links/LinkTab';
import { loginSeller } from '../Axios';
import { useCookies } from 'react-cookie'
import { restartApp } from '../../AllFunctions';


function Login() {
    const [cookies] = useCookies(['token']);


    const isUser = cookies.token ? true : false;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    // const [path, setPath] = useState('/');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = async () => {
        setError('');
        if(!email || !password){
            setError("Please input the value.")
            return;
        }else if(!emailRegex.test(email)){
            setError("Invalid email")
            return;
        }
        try {
            const data = await loginSeller({
                email,
                password
            })
            if(data.data === 'Incorrect email or password' || data.data === 'Not found' || data.data === 'Not approved yet'){
                setError(data.data);
            }else{
                window.location.href = '/'
                // restartApp();
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <form action='' className='p-4 border-2 bg-zinc-900 border-zinc-950 w-[30rem] rounded-md relative'>
                    <LinkTab path='/'>
                        <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    </LinkTab>
                    <h1 className='text-2xl text-center text-stone-300 font-bold'>Login</h1>
                    <div className='mt-8 flex flex-col gap-3 justify-center'>
                    <span className='text-red-600'>{error}</span>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="text" placeholder='EMAIL....' onChange={(e) => setEmail(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><MdEmail /></span>
                        </div>
                        <div id='inputbox' className='flex flex-col relative'>
                            <input type="password" placeholder='PASSWORD....' onChange={(e) => setPassword(e.target.value)} className='py-2 px-4 pr-8 rounded-md border-2 border-zinc-300 text-stone-200 outline-none placeholder:text-stone-400 bg-zinc-800' />
                            <span className='text-stone-200 text-xl absolute top-0 right-0 p-3'><FaLock /></span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        <LinkTab path={isUser ? `/` : `/login`} title='Login' handleOnClick={handleLogin} style='py-2 px-4 uppercase text-center bg-blue-600 hover:bg-blue-800 rounded-md' />
                        <div className='flex justify-center items-center text-stone-300'>
                            <p>Don't have an account?</p>
                            <LinkTab path='/register' title='Register' style='text-blue-600 transition-all px-2 text-xl hover:scale-110 font-bold' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login