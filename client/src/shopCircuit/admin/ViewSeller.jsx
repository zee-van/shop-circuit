import React, { useContext, useEffect, useRef, useState } from 'react'
import Sasuke from '../../assets/images/sasuke.png'
import ProfilePic from '../../assets/images/darkprofile.jpg'
import SideBar from './SideBar'
import Header from './Header'
import { deleteApproveSeller, SellerLists, viewSpecificSeller } from '../Axios'
import Modal from '../modal/Modal'
import Button from '../buttons/Button'
import LinkTab from '../links/LinkTab'
import { MyContext } from '../store/MyContext'

function ViewSeller() {
    const [allSeller, setAllSeller] = useState([]);
    const { setViewSeller, setSharedValue, setViewExistOrder } = useContext(MyContext)
    const deleteModal = useRef();
    const [currentId, setCurrentId] = useState('')


    const viewSellerByAdmin = async () => {
        try {
            const viewSeller = await SellerLists();

            setAllSeller(viewSeller)
        } catch (error) {
            console.log(error)
        }
    }

    const handleViewSeller = async (id) => {
        try {
            const result = await viewSpecificSeller(id)
            setSharedValue([])
            setViewExistOrder([])
            setViewSeller(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteApprovedSellerByAdmin = async (id) => {
        try {
            await deleteApproveSeller(id);
            viewSellerByAdmin();
            deleteModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteModalOpen = (id) => {
        deleteModal.current.open();
        setCurrentId(id)
    }
    const handleDeleteModalClose = () => {
        deleteModal.current.close();
    }

    useEffect(() => {
        viewSellerByAdmin();
    }, [])

    let btnNormal = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
    let btnOrder = 'w-full rounded-md text-center py-2 bg-blue-600 hover:bg-blue-800 px-4'


    return (
        <>
            <div className='flex'>
                <SideBar />
                <div className='w-full'>
                    <div>
                        <Header />
                    </div>
                    <div>
                        <ul className='ul p-4'>
                            {allSeller.data ? (
                                allSeller.data.length !== 0 ? (
                                    allSeller.data.map((Seller) => {
                                        return (
                                            <li key={Seller._id} className='bg-zinc-900 rounded-md flex flex-col'>
                                                <Modal ref={deleteModal}>
                                                    <div className='p-4'>
                                                        <h1 className='text-xl mt-2 text-stone-300'>Are you sure want't to Delete.</h1>
                                                        <p className='text-stone-400 mt-4'>This will delete all related data to this Seller as well.</p>
                                                        <div className='mt-8 flex gap-4 justify-end'>
                                                            <Button handleOnClick={() => deleteApprovedSellerByAdmin(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                            <Button handleOnClick={handleDeleteModalClose} btnStyle={btnNormal}>No</Button>
                                                        </div>
                                                    </div>
                                                </Modal>
                                                <div>
                                                    <div><img src={!Seller.profilePic ? `${ProfilePic}` : `data:image/jpeg;base64,${Seller.profilePic}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                                                </div>
                                                <div className='p-2'>
                                                    <h1 className='text-stone-200 font-bold'>{Seller.username}</h1>
                                                    <div className='flex flex-col mb-2'>
                                                        <div className='flex gap-2 items-center'>
                                                            <p className='text-sm text-stone-400 font-bold'>{Seller.email}</p>
                                                        </div>
                                                        <div>
                                                            <p className='text-stone-500'>{new Date(Seller.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-end'>
                                                        <button onClick={() => handleDeleteModalOpen(Seller._id)} className='py-2 px-4 rounded-md uppercase text-sm text-red-600'>Delete</button>
                                                    </div>
                                                    <div>
                                                        <LinkTab path={`/viewdetails/${Seller._id}`} >
                                                            <Button btnStyle={btnOrder} handleOnClick={() => handleViewSeller(Seller._id)}>View Details</Button>
                                                        </LinkTab>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <>
                                        <div className='text-3xl font-bold text-stone-300 animate-pulse'>No Seller</div>
                                    </>
                                )


                            ) : (
                                <>
                                    <div className='text-3xl font-bold text-stone-300 animate-pulse'>Loading...</div>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewSeller