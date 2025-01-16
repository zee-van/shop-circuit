import React, { useContext, useEffect, useRef, useState } from 'react'
import Sasuke from '../../../assets/images/sasuke.png'
import SideBar from './SideBar'
import Header from '../Header'
import { deleteProductBySeller, listedProducts, selectedProductBySeller, viewDetails } from '../../Axios'
import LinkTab from '../../links/LinkTab'
import { MyContext } from '../../store/MyContext'
import Button from '../../buttons/Button'
import Modal from '../../modal/Modal'
import { dateFormatter } from '../../../AllFunctions'


function Products() {
    const { setSharedValue } = useContext(MyContext);
    const [listedItems, setListedItems] = useState([]);
    const [currentId, setCurrentId] = useState('')
    const deleteModal = useRef();

    const handleUpdateProduct = async (id) => {
        try {
            const result = await selectedProductBySeller(id);
            setSharedValue(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleListedProducts = async () => {
        try {
            const product = await listedProducts();
            setListedItems(product)
        } catch (error) {
            console.log(error)
        }
    }

    const handleViewDetails = async (id) => {
        try {
            const result = await viewDetails(id);
            setSharedValue(result.data);
        } catch (error) {
            console.log(error)
        }
    }



    const handleDeleteProducts = async (id) => {
        try {
            await deleteProductBySeller(id)
            handleListedProducts();
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
        handleListedProducts();
    }, [])

    let btnAccept = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
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
                        {listedItems.data ? (
                            listedItems.data.length !== 0 ? (
                                listedItems.data.map((item) => {
                                    return (
                                        <li key={item._id} className='bg-zinc-900 rounded-md flex flex-col'>
                                            <Modal ref={deleteModal}>
                                                <div className='p-4'>
                                                    <h1 className='text-xl mt-2 text-stone-300'>Are you sure want't to Delete.</h1>
                                                    <div className='mt-8 flex gap-4 justify-end'>
                                                        <Button handleOnClick={() => handleDeleteProducts(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                        <Button handleOnClick={handleDeleteModalClose} btnStyle={btnNormal}>No</Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                            <div>
                                                <div><img src={`data:image/jpeg;base64,${item.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                                            </div>
                                            <div className='p-2'>
                                                {/* <h1 className='text-stone-200 text-xl font-bold'>{item.productName.length <= 25 ? item.productName : `${item.productName.slice(0, 25)}...`}</h1> */}
                                                <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{item.productName}</h1>
                                                <div className='flex flex-col mb-2'>
                                                    <div className='flex gap-2 items-center'>
                                                        <p className='text-stone-400'>Rs. <strong className='text-2xl text-red-600'>{item.price}</strong></p>
                                                    </div>
                                                    <div>
                                                        <p className='text-stone-400'>{dateFormatter(item.date) === 'less than a min ago' ? 'Now' : dateFormatter(item.date)}</p>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <LinkTab path={`/sellers/products/${item._id}`}>
                                                            <Button handleOnClick={() => handleUpdateProduct(item._id)} btnStyle={btnAccept}>Update</Button>
                                                        </LinkTab>
                                                        <Button btnStyle={btnReject} handleOnClick={() => handleDeleteModalOpen(item._id)}>Delete</Button>
                                                    </div>
                                                    <div>
                                                        <LinkTab path={`/viewdetails/${item._id}`} >
                                                            <Button btnStyle={btnViewDetails} handleOnClick={() => handleViewDetails(item._id)}>View Details</Button>
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

export default Products