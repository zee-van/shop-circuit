import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import Header from './Header'
import Modal from '../modal/Modal'
import Button from '../buttons/Button'
import { checkAdmin } from '../../AllFunctions'
import { IoIosClose } from 'react-icons/io';


function Admin() {
  // const [isAdmin, setIsAdmin] = useState();
  // const isAdminModal = useRef()
  // const navigate = useNavigate()

  // const handleCheckAdmin = async () => {
  //   try {
  //     await checkAdmin();
  //   } catch (error) {
  //     console.error('Error checking admin access:', error);
  //   }
  // }

  // useEffect(() => {
  //   handleCheckAdmin();
  // }, [])

  // const [isAdmin, setIsAdmin] = useState(null);

  // useEffect(() => {
  //   const checkPermissions = async () => {
  //     const result = await checkAdmin();
  //     setIsAdmin(result);
  //   };
  //   // if(!isAdmin){
  //   //   isAdminModal.current.open();
  //   //   return 
  //   // }    
  //   checkPermissions();
  // }, []);

  // const handleNotAdminModalClose = () => {
  //   // isAdminModal.current.close();
  //   navigate('/')
  // }

  // if (isAdmin === null) {
  //   return <div>Loading...</div>;
  // }
  // let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'
  // if (!isAdmin) {
  //   return (
  //     <form action="" className='w-full h-screen flex justify-center items-center' onSubmit={(e) => e.preventDefault()}>
  //         <div className='relative p-4 md:w-[22rem] bg-zinc-800 backdrop:bg-stone-950/90 rounded-md'>
  //         <span onClick={handleNotAdminModalClose} className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
  //           <h1 className='text-xl mt-2 text-stone-300'>You are not an authorized person.</h1>
  //           <div className='mt-8 flex gap-4 justify-end'>
  //             <Button handleOnClick={handleNotAdminModalClose} btnStyle={btnNormal}>Okey</Button>
  //           </div>
  //         </div>
  //       </form>
  //   )
  // }
  //if(!isAdmin){
  //   isAdminModal.current.open();
  //   return 
  // }   




  // useEffect(() => {
  //   handleModalOpen();
  // }, [])

  return (
    <>
      {/* <Modal ref={isAdminModal}>
        <div className='p-4'>
          <h1 className='text-xl mt-2 text-stone-300'>You are not an authorized person.</h1>
          <div className='mt-8 flex gap-4 justify-end'>
            <Button handleOnClick={handleNotAdminModalClose} btnStyle={btnNormal}>Okey</Button>
          </div>
        </div>
      </Modal> */}
      {/* {isAdmin ? ( */}
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
        <div>Sorry</div>
      )} */}
    </>
  )
}

export default Admin