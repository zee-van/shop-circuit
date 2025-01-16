import React, { useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import Sasuke from '../../assets/images/sasuke.png'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { approveAllSeller, deleteAllSeller, deleteSeller, newSellerLists, updatedSeller } from '../Axios'
import LinkTabs from './LinkTabs'
import Button from '../buttons/Button'
import Modal from '../modal/Modal'


function NewSeller() {
    // const location = useLocation();
    // const SellersData = location.state?.SellersData || [];
    // console.log(SellersData)
    // // useEffect(() => {
    // //     console.log(SellersData); // Log whenever SellersData changes
    // // }, [SellersData]);

    const [newSellersData, setNewSellersData] = useState([]);
    const [currentId, setCurrentId] = useState('')
    const deleteSellerModal = useRef();
    const [check, setCheck] = useState(false);

    const handleNewSellerLists = async () => {
        try {
            const Sellers = await newSellerLists();
            setNewSellersData(Sellers)
        } catch (error) {
            console.log(error)
        }
    }

    const handleApproveSellerByAdmin = async (id) => {
        try {
            await updatedSeller(id);
            handleNewSellerLists();

        } catch (error) {
            console.log(error);
        }
    }

    const handleApproveAllSellerByAdmin = async () => {
        try {
            await approveAllSeller();
            handleNewSellerLists();
        } catch (error) {
            console.log(error)
        }
    }

    const handleRejectAllSellerByAdmin = async () => {
        try {
            await deleteAllSeller();
            handleNewSellerLists();
        } catch (error) {
            console.log(error)
        }
    }



    const handleDeleteSellerByAdmin = async (id) => {
        try {
            await deleteSeller(id);
            handleNewSellerLists();
            deleteSellerModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    const handleRejectAllModal = () => {
        setCheck(true)
        deleteSellerModal.current.open();
    }

    const handleDeleteSellerModalOpen = (id) => {
        deleteSellerModal.current.open();
        setCurrentId(id)
    }
    const handleDeleteSellerModalClose = () => {
        deleteSellerModal.current.close();
        setCheck(false)

    }

    useEffect(() => {
        handleNewSellerLists();
    }, [])

    let btnNormal = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
    let btnReject = 'py-2 px-4 rounded-md uppercase text-sm bg-red-600 hover:bg-red-800'
    let approveAndReject = 'mt-2 flex gap-2 justify-end p-4 fixed bottom-0 right-0 bg-zinc-900 rounded-md'
    return (
        <>
            <div className='flex'>
                <SideBar />
                <div className='w-full'>
                    <div>
                        <Header />
                    </div>
                    <ul>
                        {newSellersData.data ? (
                            newSellersData.data.length !== 0 ? (
                                newSellersData.data.map((seller, i) => {
                                    return (
                                        <li key={seller._id} className='flex justify-between items-center text-stone-300 gap-4 p-4 border-b-2 border-stone-300'>
                                            <Modal ref={deleteSellerModal}>
                                                <div className='p-4'>
                                                    <h1 className='text-xl mt-2 text-stone-300'>{check ? `Are you sure want't to Reject All seller` : `Are you sure want't to Reject.`}</h1>
                                                    <p className='text-stone-400 mt-4'>This will delete {check ? `these` : `this`} seller permanently.</p>
                                                    <div className='mt-8 flex gap-4 justify-end'>
                                                        <Button handleOnClick={check ? () => handleRejectAllSellerByAdmin() : () => handleDeleteSellerByAdmin(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                        <Button handleOnClick={handleDeleteSellerModalClose} btnStyle={btnNormal}>No</Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                            <div className='flex gap-2 w-1/4'>
                                                <p className=''>{i + 1}.</p>
                                                <h1 className='font-bold'>{seller.username}</h1>
                                            </div>
                                            <p className='w-1/4'>{seller.email}</p>
                                            <p className=''>{seller.number}</p>
                                            <div className='flex gap-2'>
                                                <Button
                                                    handleOnClick={() => handleApproveSellerByAdmin(seller._id)}
                                                    btnStyle={btnNormal}>
                                                    Approve
                                                </Button>
                                                <Button
                                                    handleOnClick={() => handleDeleteSellerModalOpen(seller._id)}
                                                    btnStyle={btnReject}>
                                                    Reject
                                                </Button>
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <>
                                    <div className='text-3xl font-bold text-stone-300 animate-pulse p-4'>No seller...</div>
                                </>
                            )

                        ) : (
                            <>
                                <div className='p-4 text-3xl font-bold text-stone-300 animate-pulse'>Loading...</div>
                            </>
                        )}
                    </ul>
                    <div className={newSellersData.data ? (newSellersData.data.length > 1 ? approveAndReject : `${approveAndReject} hidden`): ('hidden')}>
                       <Button btnStyle={btnNormal} handleOnClick={() => handleApproveAllSellerByAdmin()}>Approve All</Button>
                       <Button btnStyle={btnReject} handleOnClick={handleRejectAllModal}>Reject All</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewSeller