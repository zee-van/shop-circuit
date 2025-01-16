import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import Header from '../Header'
import { acceptExistingProduct, newExistingOrderFromUser, rejectExistingProduct, viewDetails, viewExistingOrderedProduct } from '../../Axios'
import Button from '../../buttons/Button'
import Modal from '../../modal/Modal'
import LinkTab from '../../links/LinkTab'
import { MyContext } from '../../store/MyContext'
import { dateFormatter } from '../../../AllFunctions'

function NewExistOrder() {
  const { setSharedValue, setViewExistOrder } = useContext(MyContext);
  const [existingOrder, setExistingOrder] = useState([]);
  const [currentId, setCurrentId] = useState('')
  const rejectModal = useRef();

  const handleViewExistingOrder = async () => {
    try {
      const product = await newExistingOrderFromUser();
      setExistingOrder(product);
    } catch (error) {
      console.log(error)
    }
  }

  // const handleViewDetails = async (id) => {
  //   try {
  //     const result = await viewDetails(id);
  //     console.log(result)
  //     setSharedValue(result.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
      handleViewExistingOrder();
      rejectModal.current.close();
    } catch (error) {
      console.log(error)
    }
  }

  const handleAcceptProduct = async (id) => {
    try {
      const acceptedProduct = await acceptExistingProduct(id);
      handleViewExistingOrder();
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
    handleViewExistingOrder();
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
            {existingOrder.data ? (
              existingOrder.data.productsWithImages.length !== 0 ? (
                existingOrder.data.productsWithImages.map((order) => {
                  return (
                    <li key={order._id} className='bg-zinc-900'>
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
                        <div><img src={`data:image/jpeg;base64,${order.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                      </div>
                      <div className='p-2'>
                        <div className='border-b-2 border-stone-300'>
                          <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{order.productDetail.productName}</h1>
                          <div className='flex flex-col mb-2'>
                            <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{order.productDetail.price}</strong></p>
                            <p className='text-stone-400'>Posted On:  {dateFormatter(order.productDetail.date) === 'less than a min ago' ? 'Now' : dateFormatter(order.productDetail.date)}</p>
                          </div>
                        </div>
                        <div className='mb-2'>
                          <h1 className='text-stone-300'>Ordered by: <strong>{order.username}</strong></h1>
                          <p className='text-stone-400'>Number: {order.number}</p>
                          <p className='text-stone-400'>Location: {order.location}, On {dateFormatter(order.date) === 'less than a min ago' ? 'Now' : dateFormatter(order.date)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='flex'>
                            <Button btnStyle={order.status === 'Accepted' ? btnAccepted : btnAccept} status={order.status === 'Accepted' ? true : false} handleOnClick={() => handleAcceptProduct(order._id)}>{order.status}</Button>
                            <Button btnStyle={btnReject} handleOnClick={() => handleRejectModalOpen(order._id)}>Reject</Button>
                          </div>
                          <div>
                            <LinkTab path={`/viewdetails/${order._id}`} >
                              <Button btnStyle={btnViewDetails} handleOnClick={() => handleViewExistOrder(order._id)}>View Details</Button>
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

export default NewExistOrder