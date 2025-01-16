import React, { useContext, useRef, useState } from 'react'
import { MyContext } from '../store/MyContext';
import Button from '../buttons/Button';
import { productOrder, viewDetails } from '../Axios';
import LinkTab from '../links/LinkTab';
import { IoIosClose } from 'react-icons/io';
import Modal from '../modal/Modal';
import { useDispatch } from 'react-redux';
import { cartActions } from '../cart-slice';

function UserOrder() {
  const { sharedValue, setSharedValue } = useContext(MyContext);
  const [showPosts, setShowPosts] = useState(false);
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('')
  const numberRegex = /^9\d{9}$/;
  const [error, setError] = useState('');
  const userOrderModal = useRef();
  const imageModal = useRef();
  const dispatch  = useDispatch();

  // const handleOrderStatusComplete = (id) => {
  //   dispatch(cartActions.completeOrder(id));
  // }


  const handleViewDetails = async (id) => {
    try {
      const result = await viewDetails(id);
      setSharedValue(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputValidate = () => {
    setError(''); // Clear previous error
    if (number === '' || username === '' || location === '') {
      setError("Please provide value for not optional input fields");
      return false;
    } else if (!numberRegex.test(number)) {
      setError("Invalid number format");
      return false;
    } else {
      return true;
    }
  }

  const handleProductOrder = async (id) => {
    try {
      const result = await productOrder(id, {
        username,
        number,
        location,
        description,
      })
      dispatch(cartActions.completeOrder(id));
      const storedCarts = JSON.parse(localStorage.getItem('items')) || [];
      const cartToUpdate = storedCarts.find(cart => cart.id === id);
      // console.log(cartToUpdate)
      if (cartToUpdate) {
        cartToUpdate.status = 'Ordered Complete'; // Update the status
      }
      localStorage.setItem('items', JSON.stringify(storedCarts));
      // console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOrderModalOpen = () => {
    userOrderModal.current.open();
  }
  const handleOrderModalClose = () => {
    userOrderModal.current.close();
  }
  const handleImageModalOpen = () => {
    imageModal.current.open();
  }
  const handleImageModalClose = () => {
    imageModal.current.close();
  }

  let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'

  return sharedValue.length === 3 ? (
    <>
      <Modal ref={userOrderModal}>
        <div className='w-full p-4 relative h-40'>
          <h1 className='text-xl mt-2 text-stone-300'>Ordered completed Successfully.</h1>
          <p className='text-stone-400 mt-4'>Soon, You will get the feedback of your Order from seller.</p>
          <button onClick={handleOrderModalClose} className='absolute top-0 right-0 p-4'></button>
        </div>
      </Modal>
      <Modal ref={imageModal} dialogStyle={'top-0 left-0 my-[8rem] relative rounded-lg mx-auto'}>
        <img src={`data:image/jpeg;base64,${sharedValue[1].image}` ? `data:image/jpeg;base64,${sharedValue[1].image}` : ''} className='w-full' alt="" />
        <span onClick={handleImageModalClose} className='text-stone-200 text-4xl rounded-md absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>
      </Modal>
      <div className='p-4'>
        <div className='flex gap-4 mb-4'>
          <div className='h-auto bg-zinc-900 rounded-md'>
            <div className='cursor-pointer' onClick={handleImageModalOpen}>
              <img src={`data:image/jpeg;base64,${sharedValue[1].image}` ? `data:image/jpeg;base64,${sharedValue[1].image}` : ''} className='w-[30rem] aspect-square object-cover rounded-md' alt="product" />
            </div>
            <div className='flex w-[30rem] flex-col gap-2 p-2'>
              <p className='text-stone-300 text-3xl font-bold'>{sharedValue[1].productName}</p>
              <p className='text-stone-400'>Rs. <strong className='text-xl text-red-600'>{sharedValue[1].price}</strong></p>
              <p className='text-stone-400'>{sharedValue[1].description <= 150 ? sharedValue[1].description : `${sharedValue[1].description.slice(0, 150)}...`}</p>
              <p className='text-stone-400'>Posted On: {new Date(sharedValue[1].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              <div className='flex justify-end'>
                <LinkTab path={`/viewdetails/${sharedValue[1]._id}`} >
                  <button className='text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4' onClick={() => handleViewDetails(sharedValue[1]._id)}>View Details</button>
                </LinkTab>
              </div>
            </div>
          </div>
          <div className=''>
            <form action="" className='w-[35rem] relative bg-zinc-900 p-4 rounded-md' method='post' onSubmit={(e) => e.preventDefault()}>
              <LinkTab path='/'>
                <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
              </LinkTab>
              <h1 className='text-3xl font-bold text-stone-300 mb-4'>Order Now!!!</h1>
              <div className='flex flex-col w-full mt-4 gap-4'>
                <span className='text-red-600 text-sm'>{error}</span>
                <div id='inputbox' className='flex flex-col relative'>
                  <input type="text" placeholder='Username....' name='username' onChange={(e) => setUsername(e.target.value)} className='py-2 text-xl px-4 w-full outline-none text-stone-300 border-2 rounded-md resize-none border-zinc-400 bg-zinc-800' />
                </div>
                <div id='inputbox' className='flex flex-col relative'>
                  <input type="number" placeholder='Number....' name='number' onChange={(e) => setNumber(e.target.value)} className='py-2 text-xl px-4 w-full outline-none text-stone-300 border-2 rounded-md resize-none border-zinc-400 bg-zinc-800' />
                </div>
                <div id='inputbox' className='flex flex-col relative'>
                  <input placeholder='Location...' name='location' onChange={(e) => setLocation(e.target.value)} className='py-2 text-xl px-4 w-full outline-none text-stone-300 border-2 rounded-md resize-none  border-zinc-400 bg-zinc-800' type="text" />
                </div>
                <div id='inputbox' className='flex flex-col relative'>
                  <textarea placeholder='Description...(optional)' onChange={(e) => setDescription(e.target.value)} className='py-2 text-xl px-4 w-full outline-none text-stone-300 border-2 rounded-md resize-none  border-zinc-400 bg-zinc-800' type="text" />
                </div>
              </div>
              <div className='mt-4 flex gap-4'>
                <Button btnStyle={btnNormal} handleOnClick={() => { if (handleInputValidate()) { handleProductOrder(sharedValue[1]._id); handleOrderModalOpen(); } }}>Conform Order</Button>
                <LinkTab path={'/'}>
                  <Button btnStyle={btnNormal}>Cancel</Button>
                </LinkTab>
              </div>
            </form>
            {/* <div className='mt-2'>
              <h1 className='text-xl text-stone-300'>About the Product Owner</h1>
              <div className='flex items-center gap-2 h-full mt-2'>
                <div className=''>
                  <img src={`data:image/jpeg;base64,${sharedValue[2].profilePic}`} className='w-24 border-[1px] border-black aspect-square object-cover rounded-md' alt="img" />
                </div>
                <div>
                  <h1><strong>{sharedValue[2].username}</strong></h1>
                  <p>{sharedValue[2].email}</p>
                  <p>{sharedValue[2].number}</p>
                  <p>{new Date(sharedValue[2].date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              <div className='mt-2'>
                <Button btnStyle={btnNormal} handleOnClick={() => setShowPosts(!showPosts)}>{showPosts ? `Close Posts` : `View Other Posts`}</Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className='p-4 text-3xl text-stone-300 font-bold animate-pulse'>Loading...</div>
    </>
  )
}

export default UserOrder