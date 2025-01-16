import React, { useContext, useEffect, useRef, useState } from 'react'
import { allProductListsOfHome, viewDetails } from '../Axios';
import LinkTab from '../links/LinkTab';
import Button from '../buttons/Button';
import { MyContext } from '../store/MyContext';
import Modal from '../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../cart-slice';
import { dateFormatter, timeFormatter } from '../../AllFunctions';

function Home() {
    const { setSharedValue, searchedItem } = useContext(MyContext);
    const [allProducts, setAllProducts] = useState([]);
    const cartQuantity = useSelector(state => state.cart.totalQuantity);
    const cartTotalPrice = useSelector(state => state.cart.totalPrice);
    const cartItems = useSelector(state => state.cart.items);
    const [items, setItems] = useState([]);
    // const orderStatus = useSelector(state => state.cart.status);
    const dispatch = useDispatch()

    const cartModal = useRef();
    // const navigate = useNavigate()
    const handleViewDetails = async (id) => {
        try {
            const result = await viewDetails(id);
            setSharedValue(result.data);
            // navigate(`/viewdetails/:id?data=${encodeURIComponent(JSON.stringify(product.data))}`)
        } catch (error) {
            console.log(error)
        }
    }
    const handleViewAllProductsByAmin = async () => {
        try {
            const products = await allProductListsOfHome();
            setAllProducts(products);
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddToCart = (id, cart, status, currentDate) => {
        dispatch(cartActions.addItemToCart({ id, cart, status }))
        const storedCarts = JSON.parse(localStorage.getItem('items'));  
        localStorage.setItem('items', JSON.stringify([{ id, cart, status, currentDate }, ...storedCarts]))
    }

    const handleRemoveCart = (id) => {
        dispatch(cartActions.removeItemFromCart(id));
        const storedCarts = JSON.parse(localStorage.getItem('items'));
        localStorage.setItem('items', JSON.stringify(storedCarts.filter((cart) => cart.id !== id)))
        addedItems();
    }

    const handleRemoveAllCart = () => {
        dispatch(cartActions.removeAllItem());
        localStorage.setItem('items', JSON.stringify([]));
        addedItems();
    }

    const handleProductOrder = async (id) => {
        try {
            const result = await viewDetails(id);
            setSharedValue(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleCartModalOpen = () => {
        cartModal.current.open();
    }

    const handleCartModalClose = () => {
        cartModal.current.close();
    }

    const addedItems = () => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
            setItems(items);
        }
    }

    useEffect(() => {
        handleViewAllProductsByAmin();
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('items', JSON.stringify(cartItems))
    // }, [cartItems])

    useEffect(() => {
        addedItems();
    }, [cartItems])

    let btnNormal = 'px-4 py-2 bg-blue-600 rounded-md rounded-l-none hover:bg-blue-800 text-stone-300'
    let btnRemove = 'text-red-600 border-2 border-red-600 px-4 py-2 rounded-md'
    let btnRemoveAll = 'py-2 px-20 rounded-md uppercase text-sm bg-red-600 hover:bg-red-800'
    let btnOrder = 'w-full rounded-md text-center py-2 bg-blue-600 hover:bg-blue-800 px-4'
    let btnOrdered = 'w-full rounded-md text-center py-2 bg-blue-800 px-4'
    let btnAddToCart = 'w-full rounded-md text-center py-2 px-4 border-2 border-blue-600 rounded-md text-stone-300 bg-zinc-950 hover:bg-zinc-900'
    let btnAdded = 'w-full rounded-md text-center py-2 px-4 border-2 border-blue-600 rounded-md text-stone-300 bg-zinc-900'
    let btnView = 'text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4'
    return (
        <>
            {/* <div className='mt-2 flex justify-start w-full'>
                <div className='bg-zinc-900 py-4 px-8 rounded-md flex flex-col justify-center items-center gap-4 opacity-70'>
                    <p className='text-2xl text-stone-400'>Can't find item, What you need !!</p>
                    <div className='opacity-100 z-10'>
                        <LinkTab path={'/yourrequirement'}>
                            <Button btnStyle={btnNormal}>Post your requirement then !!!</Button>
                        </LinkTab>
                    </div>
                </div>
            </div> */}
            <Modal ref={cartModal} dialogStyle={'md:w-[40rem] bg-zinc-800 backdrop:bg-stone-950/90 rounded-md'}>
                <ul className='p-4 mt-4'>
                    {items.length !== 0 ? (
                        <div className='mb-6'>
                            <div className='text-3xl font-bold text-slate-300'>Your Carts</div>
                            <p className='text-xl text-stone-300'>Total Cart Price: <span className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{items.reduce((accumulator, item) => parseInt(accumulator) + parseInt(item.cart.price), 0) ? items.reduce((accumulator, item) => parseInt(accumulator) + parseInt(item.cart.price), 0) : cartTotalPrice}</strong></span></p>
                        </div>
                    ) : (
                        <div className='mb-4'>
                            <div className='text-2xl font-bold text-slate-300'>Please Add Your Favourite Product First</div>
                        </div>
                    )}
                    {items.map((item) => {
                        // console.log(item)
                        return (
                            <li key={item.id} className='p-4 bg-zinc-900 mt-2 rounded-md'>
                                <div className='flex gap-4'>
                                    <img src={`data:image/jpeg;base64,${item.cart.image}` ? `data:image/jpeg;base64,${item.cart.image}` : ''} className='w-40 opacity-80 bg-zinc-800 aspect-square object-cover rounded-md' alt="img" />
                                    <div className='p-4 w-full'>
                                        <p className='text-stone-200 text-xl font-bold'>{item.cart.productName.length <= 33 ? item.cart.productName : `${item.cart.productName.slice(0, 33)}...`}</p>
                                        <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{item.cart.price}</strong></p>
                                        <div className='flex justify-between items-center mt-6'>
                                            <div>
                                                <p className='text-stone-300'>{dateFormatter(item.currentDate) === 'less than a min ago' ? 'Now' : dateFormatter(item.currentDate)}</p>
                                            </div>
                                            <div className='flex items-center gap-4'>
                                            <Button btnStyle={btnRemove} handleOnClick={() => handleRemoveCart(item.id)}>Remove</Button>
                                            <LinkTab path={`/order/${item.id}`}>
                                                <Button btnStyle={btnOrder} handleOnClick={() => handleProductOrder(item.id)}>{item.status}</Button>
                                            </LinkTab>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                    {items.length > 1 ? (
                        <div className='mt-2 text-center sticky flex gap-12 justify-center bottom-0 p-4 bg-zinc-900 rounded-md'>
                            <Button btnStyle={btnRemoveAll} handleOnClick={handleRemoveAllCart}>Remove All</Button>
                            <Button btnStyle={btnRemove} handleOnClick={handleCartModalClose}>Close Cart</Button>
                        </div>
                    ) : (
                        <></>
                    )}


                </ul>
            </Modal>

            <div className='mt-4 mx-auto w-2/3 flex justify-between text-xl text-stone-300 items-center'>
                <div className='border-2 flex items-center border-blue-600 rounded-md'>
                    <span className='px-8 py-2'>If you can't find what you want ? then,</span>
                    <LinkTab path={'/yourrequirement'}>
                        <Button btnStyle={btnNormal}>Post your requirement</Button>
                    </LinkTab>
                </div>
                <div className='border-2 cursor-pointer flex items-center border-blue-600 rounded-md'>
                    <Button btnStyle={'py-2 px-8'} handleOnClick={handleCartModalOpen}>My Cart</Button>
                    <span className='py-2 px-4 bg-blue-600 hover:bg-blue-800 font-bold'>{items.length ? items.length : cartQuantity}</span>
                </div>
            </div>
            <ul className='ul p-4'>
                {searchedItem ? (
                    searchedItem.length === 0 ? (
                        allProducts.data ? (
                            allProducts.data.map((product) => {
                                return (
                                    <li key={product._id} className='bg-zinc-900 rounded-md flex flex-col'>
                                        <div>
                                            <div><img src={`data:image/jpeg;base64,${product.image}`} className='w-full bg-zinc-800 aspect-square object-cover rounded-md' alt="img" /></div>
                                        </div>
                                        <div className='p-2'>
                                            <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{product.productName}</h1>
                                            <div className='flex flex-col mb-2'>
                                                <div className='flex gap-2 items-center justify-between'>
                                                    <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{product.price}</strong></p>
                                                    <LinkTab path={`/viewdetails/${product._id}`} >
                                                        <button className='text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4' onClick={() => handleViewDetails(product._id)}>View Details</button>
                                                    </LinkTab>
                                                </div>

                                            </div>
                                            <div>
                                                <LinkTab path={`/order/${product._id}`}>
                                                    <Button btnStyle={(items.find(item => item.id === product._id && item.status === 'Ordered Complete')) ? btnOrdered : btnOrder} handleOnClick={() => handleProductOrder(product._id)}>{(items.find(item => item.id === product._id && item.status === 'Ordered Complete')) ? 'Ordered Complete' : 'Order Now'}</Button>
                                                </LinkTab>
                                            </div>
                                            <div className='mt-2'>
                                                <Button btnStyle={items.find((item) => item.id === product._id) ? btnAdded : `${btnAddToCart}`} status={items.find((item) => item.id === product._id) ? true : false} handleOnClick={() => handleAddToCart(product._id, product, 'Order Now', new Date())}>{items.find((item) => item.id === product._id) ? 'Added' : 'Add To Cart'}</Button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        ) : (
                            <>
                                <div className='text-3xl font-bold text-stone-300 animate-pulse'>Loading...</div>
                            </>
                        )


                    ) : (
                        searchedItem ? (
                            searchedItem.map((product) => {
                                return (
                                    <li key={product._id} className='bg-zinc-900 rounded-md flex flex-col'>
                                        <div>
                                            <div><img src={`data:image/jpeg;base64,${product.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                                        </div>
                                        <div className='p-2'>
                                            <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{product.productName}</h1>
                                            <div className='flex flex-col mb-2'>
                                                <div className='flex gap-2 items-center justify-between'>
                                                    <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{product.price}</strong></p>
                                                    <LinkTab path={`/viewdetails/${product._id}`} >
                                                        <button className='text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4' onClick={() => handleViewDetails(product._id)}>View Details</button>
                                                    </LinkTab>
                                                </div>

                                            </div>
                                            <div>
                                                <LinkTab path={`/order/${product._id}`}>
                                                    <Button btnStyle={(items.find(item => item.id === product._id && item.status === 'Ordered Complete')) ? btnOrdered : btnOrder} handleOnClick={() => handleProductOrder(product._id)}>{(items.find(item => item.id === product._id && item.status === 'Ordered Complete')) ? 'Ordered Complete' : 'Order Now'}</Button>
                                                </LinkTab>
                                            </div>
                                            <div className='mt-2'>
                                                <Button btnStyle={cartItems.find((item) => item.id === product._id) ? btnAdded : `${btnAddToCart}`} handleOnClick={() => handleAddToCart(product._id, product)}>{cartItems.find((item) => item.id === product._id) ? 'Added' : 'Add To Cart'}</Button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        ) : (
                            <>
                                <div className='text-3xl font-bold text-stone-300 animate-pulse'>Loading...</div>
                            </>
                        )

                    )
                ) : (
                    allProducts.data ? (
                        allProducts.data.map((product) => {
                            return (
                                <li key={product._id} className='bg-zinc-900 rounded-md flex flex-col'>
                                    <div>
                                        <div><img src={`data:image/jpeg;base64,${product.image}`} className='w-full aspect-square object-cover bg-zinc-800 rounded-md' alt="img" /></div>
                                    </div>
                                    <div className='p-2'>
                                        <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{product.productName}</h1>
                                        <div className='flex flex-col mb-2'>
                                            <div className='flex gap-2 items-center justify-between'>
                                                <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{product.price}</strong></p>
                                                <LinkTab path={`/viewdetails/${product._id}`} >
                                                    <button className='text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4' onClick={() => handleViewDetails(product._id)}>View Details</button>
                                                </LinkTab>
                                            </div>

                                        </div>
                                        <div>
                                            <LinkTab path={`/order/${product._id}`}>
                                                <Button btnStyle={(items.find(item => item.id === product._id && item.status === 'Ordered Complete')) ? btnOrdered : btnOrder} handleOnClick={() => handleProductOrder(product._id)}>{(items.find(item => item.id === product._id && item.status === 'Ordered Complete')) ? 'Ordered Complete' : 'Order Now'}</Button>
                                            </LinkTab>
                                        </div>
                                        <div className='mt-2'>
                                            <Button btnStyle={cartItems.find((item) => item.id === product._id) ? btnAdded : `${btnAddToCart}`} handleOnClick={() => handleAddToCart(product._id, product)}>{cartItems.find((item) => item.id === product._id) ? 'Added' : 'Add To Cart'}</Button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    ) : (
                        <>
                            <div className='text-3xl font-bold text-stone-300 animate-pulse'>Loading...</div>
                        </>
                    )
                )}
            </ul>
        </>
    )
}

export default Home