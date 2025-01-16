import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { allProductLists, deleteSpecificProduct, viewDetails } from '../Axios'
import { MyContext } from '../store/MyContext';
import LinkTab from '../links/LinkTab';
import Button from '../buttons/Button';
import Modal from '../modal/Modal';

function ViewAllProducts() {
    const [allProducts, setAllProducts] = useState([]);
    const { setSharedValue } = useContext(MyContext);
    const conformModal = useRef();
    const [currentId, setCurrentId] = useState('')

    const handleViewAllProductsByAmin = async () => {
        try {
            const products = await allProductLists();
            setAllProducts(products);
        } catch (error) {

        }
    }

    const handleDeleteSpecificProduct = async (id) => {
        try {
            const result = await deleteSpecificProduct(id)
            handleViewAllProductsByAmin();
            conformModal.current.close();
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

    const handleConformModalOpen = (id) => {
        conformModal.current.open();
        setCurrentId(id)
    }
    const handleConformModalClose = (id) => {
        conformModal.current.close();
        setCurrentId('')
    }

    useEffect(() => {
        handleViewAllProductsByAmin();
    }, [])
    let btnOrder = 'w-full rounded-md text-center py-2 bg-blue-600 hover:bg-blue-800 px-4'
    let btnDelete = 'py-2 px-4 font-bold hover:underline uppercase rounded-md text-sm text-red-600';
    let btnNormal = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'

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
                            {allProducts.data ? (
                                allProducts.data.length !== 0 ? (
                                    allProducts.data.map((product) => {
                                        return (
                                            <li key={product._id} className='bg-zinc-900 rounded-md flex flex-col'>
                                                <Modal ref={conformModal}>
                                                    <div className='p-4'>
                                                        <h1 className='text-xl mt-2 text-stone-300'>Are you sure want't to Delete.</h1>
                                                        <p className='text-stone-400 mt-4'>This will delete all related data to this Product as well. Is it <strong><q>illegal</q></strong>.</p>
                                                        <div className='mt-8 flex gap-4 justify-end'>
                                                            <Button handleOnClick={() => handleDeleteSpecificProduct(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                            <Button handleOnClick={handleConformModalClose} btnStyle={btnNormal}>No</Button>
                                                        </div>
                                                    </div>
                                                </Modal>
                                                <div>
                                                    <div><img src={`data:image/jpeg;base64,${product.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                                                </div>
                                                <div className='p-2'>
                                                    <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{product.productName}</h1>
                                                    <div className='flex flex-col mb-2'>
                                                        <div className='flex gap-2 items-center'>
                                                            <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{product.price}</strong></p>
                                                        </div>
                                                        <div>
                                                            <p className='text-stone-500'>{new Date(product.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-end'>
                                                        {/* <button onClick={() => deleteApprovedSellerByAdmin(product._id)} className='py-2 px-4 rounded-md uppercase text-sm text-red-600'>Delete</button> */}
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <LinkTab path={`/viewdetails/${product._id}`} >
                                                            <Button btnStyle={btnOrder} handleOnClick={() => handleViewDetails(product._id)}>View Details</Button>
                                                        </LinkTab>
                                                        <Button btnStyle={btnDelete} handleOnClick={() => handleConformModalOpen(product._id)}>Delete</Button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <>
                                        <div className='p-4 text-3xl font-bold text-stone-300 animate-pulse'>No Products...</div>
                                    </>
                                )

                            ) : (
                                <>
                                    <div className='p-4 text-3xl font-bold text-stone-300 animate-pulse'>Loading...</div>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewAllProducts