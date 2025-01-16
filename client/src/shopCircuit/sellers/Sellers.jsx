import React, { act, useEffect, useRef, useState } from 'react'
import Header from './Header'
import SideBar from './sellertab/SideBar'
import { checkSeller } from '../../AllFunctions'
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import { IoIosClose } from 'react-icons/io';


function Sellers() {
    // const [isSeller, setIsSeller] = useState(false);
    // const isSellerModal = useRef();
    // const navigate = useNavigate()

    // const handleCheckSeller = () => {
    //     if (checkSeller() === true) {
    //         setIsSeller(true);
    //     }
    //     isSellerModal.current.open();
    // }

    // const handleNotAdminModalClose = () => {
    //     isSellerModal.current.close();
    //     navigate('/')
    // }

    // useEffect(() => {
    //     handleCheckSeller();
    // })
    // const [tab, setTab] = useState(0);
    // let content;
    // if(tab == 1){
    //     content = <Products/>
    // }else if(tab == 2){
    //     content = <NewOrder />
    // }else if(tab == 3){
    //     content = <AcceptedOrder />
    // }else if(tab == 4){
    //     content = <Upload />
    // }else{
    //     content = <h1>Pick up</h1>
    // }

    // let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'

    // const isSellerModel = useRef()
    // const navigate = useNavigate()
  
    // const handleCheckSeller = async () => {
    //   try {
    //     await checkSeller();
    //   } catch (error) {
    //     console.error('Error checking admin access:', error);
    //   }
    // }
  
    // useEffect(() => {
    //     handleCheckSeller();
    // }, [])
  
    // const [isSeller, setIsSeller] = useState(null);
  
    // useEffect(() => {
    //   const checkPermissions = async () => {
    //     const result = await checkSeller();
    //     setIsSeller(result);
    //   };
    //   // if(!isAdmin){
    //   //   isAdminModal.current.open();
    //   //   return 
    //   // }    
    //   checkPermissions();
    // }, []);
  
    // const handleNotSellerModalClose = () => {
    //   // isAdminModal.current.close();
    //   navigate('/')
    // }
  
    // if (isSeller === null) {
    //   return <div>Loading...</div>;
    // }
    // if (!isSeller) {
    //   return (
    //     <form action="" className='w-full h-screen flex justify-center items-center' onSubmit={(e) => e.preventDefault()}>
    //       <div className='relative p-4 md:w-[22rem] bg-zinc-800 backdrop:bg-stone-950/90 rounded-md'>
    //       <span onClick={handleNotSellerModalClose} className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
    //         <h1 className='text-xl mt-2 text-stone-300'>You are not an authorized person.</h1>
    //         <div className='mt-8 flex gap-4 justify-end'>
    //           <Button handleOnClick={handleNotSellerModalClose} btnStyle={btnNormal}>Okey</Button>
    //         </div>
    //       </div>
    //     </form>
    //   )
    // }
    return (
        <>
            {/* <Modal ref={isSellerModal}>
                <div className='p-4'>
                    <h1 className='text-xl mt-2 text-stone-300'>You are not an authorized person.</h1>
                    <div className='mt-8 flex gap-4 justify-end'>
                        <Button handleOnClick={handleNotAdminModalClose} btnStyle={btnNormal}>Okey</Button>
                    </div>
                </div>
            </Modal> */}
            {/* {isSeller ? ( */}
                <div className='flex'>
                    <SideBar />
                    <div className='w-full'>
                        <div>
                            <Header />
                        </div>
                        <div className='text-4xl text-stone-400 m-8'>
                            <h1 className='font-bold'>Select What You Want!!!</h1>
                        </div>
                    </div>
                </div>
            {/* ) : (
                <div className='text-center my-[3rem] mx-auto text-stone-300 text-2xl'>You are not an authorized person</div>
            )} */}

        </>
    )
}

export default Sellers