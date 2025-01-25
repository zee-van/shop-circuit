import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfilePic from '../../assets/images/darkprofile.jpg'
import { CiLogout } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import LinkTab from '../links/LinkTab';
import { useLocation } from 'react-router-dom';
import { adminDetails, logout } from '../Axios';
import { dateFormatter, restartApp } from '../../AllFunctions';
import Button from '../buttons/Button';
import Modal from '../modal/Modal';
import { IoPersonAdd } from "react-icons/io5";
import { MyContext } from '../store/MyContext';
import { IoIosClose } from 'react-icons/io';




function Header() {
    const location = useLocation();
    let newLocation = location.pathname.split('/');
    let newLocationAfterSplit = `${newLocation[0]}/${newLocation[1]}`
    const logoutConfirmModal = useRef();
    const notAdminModal = useRef();
    const imageModal = useRef();

    const [logPersonDetail, setLogPersonDetail] = useState({});
    const { setIsAdmin } = useContext(MyContext)

    const loggedPersonDetails = async () => {
        try {
            const loggedPersonAdmin = await adminDetails();
            setLogPersonDetail(loggedPersonAdmin)
            if (loggedPersonAdmin.data === 'invalid Access') {
                notAdminModal.current.open();
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loggedPersonDetails();

    }, [])

    const handleLogoutAdmin = async () => {
        try {
            await logout();
            restartApp();
            loggedPersonDetails();
        } catch (error) {
            console.log(error)
        }
        window.location.href = '/'
        logoutConfirmModal.current.close();

    }

    const handleIsAdmin = () => {
        setIsAdmin(true)
    }

    const handleLogoutModalOpen = () => {
        logoutConfirmModal.current.open();
    }
    const handleLogoutModalClose = () => {
        logoutConfirmModal.current.close();
    }
    const handleNotAdminModalClose = () => {
        notAdminModal.current.close();
    }
    const handleImageModalOpen = () => {
        imageModal.current.open();
    }
    const handleImageModalClose = () => {
        imageModal.current.close();
    }




    // const date = new Date(logPersonDetail.data?.date);
    // const options = { year: 'numeric', month: 'short', day: 'numeric' };
    // const formattedDate = date.toLocaleDateString(undefined, options);

    let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'
    let btnLogout = 'py-2 px-8 bg-blue-600 hover:bg-blue-800 flex gap-4 items-center rounded-md uppercase'

    return (
        <>
            <Modal ref={logoutConfirmModal}>
                <div className='p-4'>
                    <h1 className='text-xl mt-2 text-stone-300'>Are you sure want't to logout.</h1>
                    <div className='mt-8 flex gap-4 justify-end'>
                        <Button handleOnClick={() => handleLogoutAdmin()} btnStyle={btnNormal}>Yes</Button>
                        <Button handleOnClick={handleLogoutModalClose} btnStyle={btnNormal}>No</Button>
                    </div>
                </div>
            </Modal>
            <Modal ref={imageModal} dialogStyle={'top-0 left-0 my-[8rem] relative rounded-lg mx-auto'}>
                <img src={!logPersonDetail.data?.profilePic ? `${ProfilePic}` : `data:image/jpeg;base64,${logPersonDetail.data?.profilePic}`} className='w-full' alt="" />
                <span onClick={handleImageModalClose} className='text-stone-200 text-4xl rounded-md absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>

            </Modal>
            {/* <Modal ref={notAdminModal}>
            <div className='p-4'>
                <h1 className='text-xl mt-2 text-stone-300'>You basterd wan't to see the admin data. Fuck off.</h1>
                <div className='mt-8 flex gap-4 justify-end'>
                <Button handleOnClick={handleNotAdminModalClose} btnStyle={btnNormal}>Okey</Button>
                </div>
            </div>
        </Modal> */}
            {logPersonDetail.data ? (
                <div className='w-full justify-between p-4 flex gap-4 border-b border-black'>
                    <div className='flex gap-2 items-center relative'>
                        <img src={!logPersonDetail.data?.profilePic ? `${ProfilePic}` : `data:image/jpeg;base64,${logPersonDetail.data?.profilePic}`} onClick={handleImageModalOpen} className='w-24 border-[1px] border-black aspect-square object-cover rounded-full cursor-pointer' alt="img" />
                        <div>
                            <h1 className='text-stone-400'>Hi <strong className='text-stone-300'>{logPersonDetail.data?.username},</strong> what's up?</h1>
                            <p className='text-stone-400'><strong className='text-stone-300'>Email:</strong> {logPersonDetail.data?.email}</p>
                            <p className='text-stone-400'><strong className='text-stone-300'>Role:</strong> {logPersonDetail.data?.role}</p>
                            <p className='text-stone-400'><strong className='text-stone-300'>Date Joined:</strong> {dateFormatter(logPersonDetail.data?.date) === 'less than a min ago' ? 'Now' : dateFormatter(logPersonDetail.data?.date)}</p>
                        </div>
                        <LinkTab path={`${newLocationAfterSplit}/edit`}>
                            <span className='text-xl absolute bottom-0 z-10 left-0 p-2 bg-stone-900 opacity-90 rounded-full text-stone-300'><FaEdit /></span>
                        </LinkTab>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button onClick={() => handleLogoutModalOpen()} className='py-2 px-8 bg-blue-600 hover:bg-blue-800 flex gap-2 justify-between items-center rounded-md'>
                            <span className='uppercase'>LogOut</span>
                            <span className='font-bold text-2xl'><CiLogout /></span>
                        </button>
                        <LinkTab path={'/register'}>
                            <button onClick={handleIsAdmin} className='py-2 px-8 bg-blue-600 hover:bg-blue-800 flex gap-2 justify-between items-center rounded-md'>
                                <span className='uppercase'>Add Admin</span>
                                <span className='font-bold text-2xl'><IoPersonAdd /></span>
                            </button>
                        </LinkTab>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Header