import React, { useEffect, useRef, useState } from 'react'
import Sasuke from '../../assets/images/sasuke.png'
import ProfilePic from '../../assets/images/darkprofile.jpg'
import { CiLogout } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import LinkTab from '../links/LinkTab';
import { useLocation } from 'react-router-dom';
import { adminDetails, logout, SellerDetails } from '../Axios';
import { dateFormatter, restartApp } from '../../AllFunctions';
import Modal from '../modal/Modal';
import Button from '../buttons/Button';
import { IoIosClose } from 'react-icons/io';



function Header() {
    const location = useLocation();
    let newLocation = location.pathname.split('/');
    let newLocationAfterSplit = `${newLocation[0]}/${newLocation[1]}`
    const [logPersonDetail, setLogPersonDetail] = useState({});
    const logoutConfirmModal = useRef();
    const imageModal = useRef();


    const loggedPersonDetails = async () => {
        try {
            const loggedPerson = await SellerDetails();
            setLogPersonDetail(loggedPerson)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loggedPersonDetails();

    }, [])

    const handleLogoutSeller = async () => {
        try {
            await logout();
            loggedPersonDetails();
        } catch (error) {
            console.log(error)
        }
        window.location.href = '/';
        logoutConfirmModal.current.close();
    }

    const handleLogoutModalOpen = () => {
        logoutConfirmModal.current.open();
    }
    const handleLogoutModalClose = () => {
        logoutConfirmModal.current.close();
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
                        <Button handleOnClick={() => handleLogoutSeller()} btnStyle={btnNormal}>Yes</Button>
                        <Button handleOnClick={handleLogoutModalClose} btnStyle={btnNormal}>No</Button>
                    </div>
                </div>
            </Modal>
            <Modal ref={imageModal} dialogStyle={'top-0 left-0 my-[8rem] relative rounded-lg mx-auto'}>
                <img src={!logPersonDetail.data?.profilePic ? `${ProfilePic}` : `data:image/jpeg;base64,${logPersonDetail.data?.profilePic}`} className='w-full' alt="" />
                <span onClick={handleImageModalClose} className='text-stone-200 text-4xl rounded-md absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>

            </Modal>
            {logPersonDetail.data ? (
                <div className='w-full justify-between p-4 flex gap-4 border-b border-black'>
                <div className='flex gap-2 items-center relative'>
                    <img src={!logPersonDetail.data?.profilePic ? `${ProfilePic}` : `data:image/jpeg;base64,${logPersonDetail.data?.profilePic}`} className='w-24 border-[1px] border-black aspect-square cursor-pointer object-cover rounded-full' onClick={handleImageModalOpen} alt="img" />
                    <div>
                        <h1 className='text-stone-400'>Hi <strong className='text-stone-300'>{logPersonDetail.data?.username},</strong> what's up?</h1>
                        <p className='text-stone-400'><strong className='text-stone-300'>Email:</strong> {logPersonDetail.data?.email}</p>
                        <p className='text-stone-400'><strong className='text-stone-300'>Role:</strong> {logPersonDetail.data?.role}</p>
                        <p className='text-stone-400'><strong className='text-stone-300'>Category:</strong> {logPersonDetail.data?.category}</p>
                        <p className='text-stone-400'><strong className='text-stone-300'>Date Joined:</strong> {dateFormatter(logPersonDetail.data?.date) === 'less than a min ago' ? 'Now' : dateFormatter(logPersonDetail.data?.date)}</p>
                        {/* <p className='text-stone-400'><strong className='text-stone-300'>Date Joined:</strong> {new Date(logPersonDetail.data?.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p> */}
                    </div>
                    <LinkTab path={`${newLocationAfterSplit}/edit`}>
                        <span className='text-xl absolute bottom-0 left-0 p-2 z-10 bg-stone-900 opacity-90 rounded-full text-stone-300'><FaEdit /></span>
                    </LinkTab>
                </div>
                <div className=''>
                    {/* <LinkTab path={'/'}> */}
                    <Button handleOnClick={() => handleLogoutModalOpen()} btnStyle={btnLogout} title={'logout'}>
                        <span className='font-bold text-2xl'><CiLogout /></span>
                    </Button>
                    {/* </LinkTab> */}
                </div>
            </div>
            ) : (
                <></>
            )}
            
        </>
    )
}

export default Header