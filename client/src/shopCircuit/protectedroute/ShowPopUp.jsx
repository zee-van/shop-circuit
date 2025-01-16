import React, { useEffect } from 'react'
import Button from '../buttons/Button'
import { IoIosClose } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import LinkTab from '../links/LinkTab';
import { useCookies } from 'react-cookie';

function ShowPopUp() {
    const [cookies] = useCookies(['token']);
    const location = useLocation()


    const navigate = useNavigate();
    let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'

    const handleNotAdminModalClose = () => {
        navigate('/')
    }

    const isUser = cookies.token ? true : false;
    return (
        <>
            <form action="" className='w-full h-screen flex justify-center items-center' onSubmit={(e) => e.preventDefault()}>
                <div className='relative p-4 md:w-[22rem] bg-zinc-800 backdrop:bg-stone-950/90 rounded-md'>
                    <span onClick={handleNotAdminModalClose} className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    <h1 className='text-xl mt-2 text-stone-300'>{isUser ? (location.pathname === '/login' || location.pathname === '/register' ? `Please Logout first` : `You are not an authorized person.`) : `please login first`}</h1>
                    {/* <h1 className='text-xl mt-2 text-stone-300'>{isUser ? `You are not an authorized person.` : `please login first`}</h1> */}
                    <div className='mt-8 flex gap-4 justify-end'>
                        <LinkTab path={isUser ? '/' : '/login'}>
                        {/* <LinkTab path={isUser ? (location.pathname === '/login' || location.pathname === '/register' ? `/` : `/`) : `/login`}> */}
                            <Button btnStyle={btnNormal}> {isUser ? `Cancel` : `Login`}</Button>
                        </LinkTab>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ShowPopUp