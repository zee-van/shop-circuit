import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import Header from '../Header'
import { completeNewOrderFromUser, deleteNewOrderFromUser, newOrderFromUser, viewUserRequirementProduct } from '../../Axios';
import Button from '../../buttons/Button';
import { MyContext } from '../../store/MyContext';
import LinkTab from '../../links/LinkTab';
import Modal from '../../modal/Modal';
import { dateFormatter } from '../../../AllFunctions';

function NewOrder() {
    const [listedItems, setListedItems] = useState([]);
    const { setViewExistOrder, setSharedValue } = useContext(MyContext)
    const [currentId, setCurrentId] = useState('')
    const conformModal = useRef();
    const deleteModal = useRef();
    const handleListedProducts = async () => {
        try {
            const product = await newOrderFromUser();
            setListedItems(product)
        } catch (error) {
            console.log(error)
        }
    }

    const handleViewExistOrder = async (id) => {
        try {
            const result = await viewUserRequirementProduct(id);
            setSharedValue([]);
            setViewExistOrder(result)
        } catch (error) {
            console.log(error);
        }
    }
    const handleCompleteUserPost = async (id) => {
        try {
            await completeNewOrderFromUser(id);
            handleListedProducts();
            conformModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteNewOrderFromUser = async (id) => {
        try {
            await deleteNewOrderFromUser(id);
            handleListedProducts();
            deleteModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    const handleConformModalOpen = (id) => {
        conformModal.current.open();
        setCurrentId(id)
    }
    const handleConformModalClose = () => {
        conformModal.current.close();
    }
    const handleDeleteModalOpen = (id) => {
        deleteModal.current.open();
        setCurrentId(id)
    }
    const handleDeleteModalClose = () => {
        deleteModal.current.close();
    }

    useEffect(() => {
        handleListedProducts();
    }, [])
    let btnPending = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600'
    let btnCompleted = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-800'
    let btnNormal = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
    let btnViewDetails = 'text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4'
    let btnReject = 'py-2 px-4 rounded-md hover:underline font-bold text-sm text-red-600'
    return (
        <>

            <div className='flex'>
                <SideBar />
                <div className='w-full'>
                    <div>
                        <Header />
                    </div>
                    <ul className='ul p-4'>
                        {listedItems.data ? (
                            listedItems.data.length !== 0 ? (
                                listedItems.data.map((item) => {
                                    return (
                                        <li key={item.listedProduct._id} className='bg-stone-800 rounded-md flex flex-col'>
                                            <Modal ref={conformModal}>
                                                <div className='p-4'>
                                                    <h1 className='text-xl mt-2 text-stone-300'>Are you sure this order has been completed.</h1>
                                                    <p className='text-stone-400 mt-4'>It means this order has been delivered to the user successfully.</p>
                                                    <div className='mt-8 flex gap-4 justify-end'>
                                                        <Button handleOnClick={() => handleCompleteUserPost(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                        <Button handleOnClick={handleConformModalClose} btnStyle={btnNormal}>No</Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                            <Modal ref={deleteModal}>
                                                <div className='p-4'>
                                                    <h1 className='text-xl mt-2 text-stone-300'>Are you sure want to delete.</h1>
                                                    <p className='text-stone-400 mt-4'>It means you will no more see this post.</p>
                                                    <div className='mt-8 flex gap-4 justify-end'>
                                                        <Button handleOnClick={() => handleDeleteNewOrderFromUser(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                        <Button handleOnClick={handleDeleteModalClose} btnStyle={btnNormal}>No</Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                            <div>
                                                <div><img src={`data:image/jpeg;base64,${item.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                                            </div>
                                            <div className='p-2'>
                                                <div className='border-b-2 border-stone-300'>
                                                    <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{item.listedProduct.productName}</h1>
                                                    <div className='flex flex-col mb-2'>
                                                        <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{item.listedProduct.price}</strong></p>
                                                    </div>
                                                </div>
                                                <div className='mb-2'>
                                                    <h1 className='text-stone-300'>Posted by: <strong>{item.listedProduct.username}</strong></h1>
                                                    <p className='text-stone-400'>Number: {item.listedProduct.number}</p>
                                                    <p className='text-stone-400'>Location: {item.listedProduct.location ? item.listedProduct.location : `......`}, On {dateFormatter(item.listedProduct.date) === 'less than a min ago' ? 'Now' : dateFormatter(item.listedProduct.date)}</p>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <Button btnStyle={item.listedProduct.status === 'Completed' ? btnCompleted : btnPending} status={item.listedProduct.status === 'Completed' ? true : false} handleOnClick={() => handleConformModalOpen(item.listedProduct._id)}>{item.listedProduct.status}</Button>
                                                    <Button btnStyle={btnReject} handleOnClick={() => handleDeleteModalOpen(item.listedProduct._id)}>Delete</Button>
                                                    <LinkTab path={`/viewdetails/${item.listedProduct._id}`} >
                                                        <Button btnStyle={btnViewDetails} handleOnClick={() => handleViewExistOrder(item.listedProduct._id)}>View Details</Button>
                                                    </LinkTab>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        </li>
                                    )

                                })
                            ) : (
                                <div className='text-2xl text-stone-300 font-bold animate-pulse'>No items..</div>
                            )
                        ) : (
                            <div className='text-2xl text-stone-300 font-bold animate-pulse'>Loading...</div>
                        )}

                    </ul>
                </div>
            </div>
        </>
    )
}

export default NewOrder