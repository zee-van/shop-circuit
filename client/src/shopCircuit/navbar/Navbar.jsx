import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import ProfilePic from '../../assets/images/darkprofile.jpg';
import Sasuke from '../../assets/images/sasuke.png';
import Login from '../login_register/Login';
import LinkTab from '../links/LinkTab';
import { FaHome } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import { useCookies } from 'react-cookie';
import { adminDetails, SellerDetails, searchedProduct } from '../Axios';
import { MyContext } from '../store/MyContext';
import Store from '../icons/Store';
import Home from '../homepage/Home';
import { useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';
import { FaUser } from "react-icons/fa";




function Navbar() {
    const { profilePic } = useContext(MyContext);
    // console.log(profilePic);
    const [path, setPath] = useState('/');
    const navigate = useNavigate();
    const { setSharedValue, setSearchedItem } = useContext(MyContext)
    const [logPersonDetail, setLogPersonDetail] = useState({});
    const [query, setQuery] = useState('')

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            navigate('/')
        }
    }
    const handleSearchProduct = async (e) => {
        let searched = e.target.value
        setQuery(searched)
        if (searched === '') {
            setSharedValue([]);
            setSearchedItem([]);
            return;
        }
        if (searched.trim() !== '') {
            try {
                const product = await searchedProduct(searched);
                setSearchedItem(product.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            setSharedValue([])
            setSearchedItem([])
        }

    }


    const loggedPersonDetails = async () => {
        try {
            const loggedPerson = await SellerDetails();
            const loggedPersonAdmin = await adminDetails();
            if (loggedPersonAdmin.data === 'Invalid admin') {
                setLogPersonDetail(loggedPerson);
            } else {
                setLogPersonDetail(loggedPersonAdmin);
            }
            const isAdmin = loggedPersonAdmin.data === 'Invalid admin' ? true : false;
            const isSeller = loggedPerson.data === 'Invalid seller' ? true : false;
            if (isAdmin) {
                setPath('/sellers');
            } else if (isSeller) {
                setPath('/admin')
            } else {
                setPath('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loggedPersonDetails();
    }, [])

    // const [cookies] = useCookies(['token']);

    // useEffect(() => {
    //     if(cookies.token){
    //         console.log(cookies.token)
    //     }else{
    //         console.log("first")
    //     }
    // }, [cookies])
    // const isUser = cookies.token ? true : false;
    let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'

    return (
        <>
            {/* <div className='py-2 px-8 bg-gradient-to-r from-[#6b11cb86] to-[#2574fc86] flex justify-between items-center'> */}
            <div className='py-2 px-8 bg-zinc-900 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                <LinkTab path='/'>
                    <div className='flex relative flex-col items-start justify-center uppercase cursor-pointer'>
                        <h1 id='logo' className='font-bold'>Shop-Circuit</h1>
                        {/* <Store /> */}
                        {/* <span id='logoIcon' className='text-stone-400'><MdLocalGroceryStore /></span> */}
                    </div>
                </LinkTab>
                {/* <LinkTab path={'/yourrequirement'}>
                    <Button btnStyle={btnNormal}>Post your requirement</Button>
                </LinkTab> */}
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='relative'>
                        <input className='w-[40rem] py-2 px-4 bg-zinc-800 border-[1px] border-zinc-400 outline-none rounded-md text-stone-400 text-xl' name='query' type="text" placeholder='Search, What do you want to order..' value={query} onChange={(e) => handleSearchProduct(e)} onKeyDown={handleEnterKey} />
                        <span className='absolute top-0 right-0 text-3xl text-stone-200 p-2'><CiSearch /></span>
                    </div>
                    <div className='cursor-pointer'>
                        <LinkTab path={path}>
                        {(path === '/' || path === '/login') ? (
                        <div className='w-24 flex items-center justify-center aspect-square object-cover rounded-full'>
                            <span className='text-4xl bg-blue-600 p-4 rounded-full text-stone-300'><FaUser /></span>
                        </div>
                        ) : (
                            <img className='w-24 border-[1px] border-black aspect-square object-cover rounded-full' src={!logPersonDetail.data?.profilePic ? (profilePic ? profilePic : ProfilePic) : (profilePic ? profilePic : `data:image/jpeg;base64,${logPersonDetail.data?.profilePic}`)} alt="profile" />
                        )}
                            {/* <img className='w-20 aspect-square rounded-full border-[1px] border-black' src={isUser ? `${image}` : `${profilePic}`} alt="profile" /> */}
                        </LinkTab>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar