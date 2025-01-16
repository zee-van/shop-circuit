import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import Header from '../Header'
import { acceptedExistingProduct, rejectExistingProduct, viewExistingOrderedProduct } from '../../Axios';
import LinkTab from '../../links/LinkTab';
import Button from '../../buttons/Button';
import Modal from '../../modal/Modal';
import { MyContext } from '../../store/MyContext';
import { dateFormatter } from '../../../AllFunctions';

function AcceptedOrder() {
    const [acceptedOrders, setAcceptedOrders] = useState([]);
    const { setSharedValue, setViewExistOrder } = useContext(MyContext)
    const [currentId, setCurrentId] = useState('')
    const rejectModal = useRef();

    const handleViewAcceptedOrder = async () => {
        const acceptedResult = await acceptedExistingProduct();
        setAcceptedOrders(acceptedResult)
    }

    const handleViewExistOrder = async (id) => {
        try {
            const result = await viewExistingOrderedProduct(id);
            setSharedValue([]);
            setViewExistOrder(result)
        } catch (error) {
            console.log(error);
        }
    }
   const handleRejectProduct = async (id) => {
       try {
         await rejectExistingProduct(id);
         handleViewAcceptedOrder();
         rejectModal.current.close();
       } catch (error) {
         console.log(error)
       }
     }

    const handleRejectModalOpen = (id) => {
        rejectModal.current.open();
        setCurrentId(id)
    }
    const handleRejectModalClose = () => {
        rejectModal.current.close();
    }

    useEffect(() => {
        handleViewAcceptedOrder();
    }, [])

    let btnAccept = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
    let btnAccepted = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-800'
    let btnNormal = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
    let btnReject = 'py-2 px-4 rounded-md hover:underline font-bold text-sm text-red-600'
    let btnViewDetails = 'text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4'


    return (
        <>
            <div className='flex'>
                <SideBar />
                <div className='w-full'>
                    <div>
                        <Header />
                    </div>
                    <ul className='ul p-4'>
                        {acceptedOrders.data ? (
                            acceptedOrders.data.productsWithImages.length !== 0 ? (
                                acceptedOrders.data.productsWithImages.map((acceptedOrder) => {
                                    return (
                                        <li key={acceptedOrder._id} className='bg-zinc-900'>
                                            <Modal ref={rejectModal}>
                                                <div className='p-4'>
                                                    <h1 className='text-xl mt-2 text-stone-300'>Are you sure want't to Reject.</h1>
                                                    <div className='mt-8 flex gap-4 justify-end'>
                                                        <Button handleOnClick={() => handleRejectProduct(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                        <Button handleOnClick={handleRejectModalClose} btnStyle={btnNormal}>No</Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                            <div>
                                                <div><img src={`data:image/jpeg;base64,${acceptedOrder.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                                            </div>
                                            <div className='p-2'>
                                                <div className='border-b-2 border-stone-300'>
                                                    <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{acceptedOrder.productDetail.productName}</h1>
                                                    <div className='flex flex-col mb-2'>
                                                        <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{acceptedOrder.productDetail.price}</strong></p>
                                                        <p className='text-stone-400'>Posted On:  {dateFormatter(acceptedOrder.productDetail.date) === 'less than a min ago' ? 'Now' : dateFormatter(acceptedOrder.productDetail.date)}</p>
                                                    </div>
                                                </div>
                                                <div className='mb-2'>
                                                    <h1 className='text-stone-300'>Ordered by: <strong>{acceptedOrder.username}</strong></h1>
                                                    <p className='text-stone-400'>Number: {acceptedOrder.number}</p>
                                                    <p className='text-stone-400'>Location: {acceptedOrder.location}, On {dateFormatter(acceptedOrder.date) === 'less than a min ago' ? 'Now' : dateFormatter(acceptedOrder.date)}</p>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex'>
                                                        <Button btnStyle={acceptedOrder.status === 'Accepted' ? btnAccepted : btnAccept} status={acceptedOrder.status === 'Accepted' ? true : false} handleOnClick={() => handleAcceptProduct(acceptedOrder._id)}>{acceptedOrder.status}</Button>
                                                        <Button btnStyle={btnReject} handleOnClick={() => handleRejectModalOpen(acceptedOrder._id)}>Reject</Button>
                                                    </div>
                                                    <div>
                                                        <LinkTab path={`/viewdetails/${acceptedOrder._id}`} >
                                                            <Button btnStyle={btnViewDetails} handleOnClick={() => handleViewExistOrder(acceptedOrder._id)}>View Details</Button>
                                                        </LinkTab>
                                                    </div>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <div className='text-2xl text-stone-300 font-bold animate-pulse'>No Items...</div>
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

export default AcceptedOrder