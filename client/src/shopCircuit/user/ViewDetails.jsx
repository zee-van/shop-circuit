import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfilePic from '../../assets/images/darkprofile.jpg'
import { MyContext } from '../store/MyContext';
import Button from '../buttons/Button';
import { useLocation } from 'react-router-dom';
import LinkTab from '../links/LinkTab';
import { viewDetails } from '../Axios';
import Modal from '../modal/Modal';
import { IoIosClose } from 'react-icons/io';
import { dateFormatter, timeFormatter } from '../../AllFunctions';
// import { handleViewDetails } from '../../AllFunctions';

function ViewDetails() {
  const { sharedValue, setSharedValue, viewExistOrder, viewSeller } = useContext(MyContext);
  const [productOrSeller, setProductOrSeller] = useState(null)
  const imageModal = useRef();
  // console.log(viewSeller);
  // console.log(viewExistOrder);
  // console.log(sharedValue)

  const [showPosts, setShowPosts] = useState(false);
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const data = JSON.parse(decodeURIComponent(queryParams.get('data')));
  // console.log(data)

  const handleViewDetails = async (id) => {
    try {
      const result = await viewDetails(id);
      setSharedValue(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleProductOrder = async (id) => {
    try {
      const result = await viewDetails(id);
      setSharedValue(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  function handleProductView(){
    imageModal.current.open();
    setProductOrSeller(true)
  }
  function handleSellerView(){
    imageModal.current.open();
    setProductOrSeller(false)
  }
  const handleImageModalOpen = () => {
    imageModal.current.open();
  }
  const handleImageModalClose = () => {
    imageModal.current.close();
  }



  let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'
  let btnView = 'text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4';
  let btnDelete = 'py-2 px-4 rounded-md hover:underline font-bold uppercase text-sm text-red-600'
  let btnDeleteForAdmin = 'py-2 rounded-md hover:underline font-bold uppercase text-sm text-red-600'
  let btnOrder = 'w-full rounded-md text-center py-2 bg-blue-600 hover:bg-blue-800 px-4'
  return sharedValue.length === 3 ? (
    <>
      <Modal ref={imageModal} dialogStyle={'top-0 left-0 my-[8rem] relative rounded-lg mx-auto'}>
        <img src={productOrSeller === null ? '' : (productOrSeller ? (`data:image/jpeg;base64,${sharedValue[1].image}`) : (sharedValue[2].profilePic !== null ? `data:image/jpeg;base64,${sharedValue[2].profilePic}` : `${ProfilePic}`))} className='w-full' alt="" />
        <span onClick={handleImageModalClose} className='text-stone-200 text-4xl rounded-md absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>
      </Modal>
      <div className='p-4'>
        <h1 className='text-center text-4xl text-stone-400 font-bold mb-4 h-auto'>About this post???</h1>
        <div className='flex gap-4 w-full mb-4'>
          <div className='w-2/5 h-auto cursor-pointer' onClick={handleProductView}>
            <img src={`data:image/jpeg;base64,${sharedValue[1].image}` ? `data:image/jpeg;base64,${sharedValue[1].image}` : ``} className='w-full aspect-square object-cover rounded-md' alt="product" />
          </div>
          <div className='w-full'>
            <div className='flex flex-col gap-2 border-b-[1px] border-white'>
              <p className='text-stone-300 text-3xl font-bold'>{sharedValue[1].productName}</p>
              <p className='text-stone-400'>Rs. <strong className='text-xl text-red-600'>{sharedValue[1].price}</strong></p>
              <p className='text-stone-400'>{sharedValue[1].description}</p>
              <p className='text-stone-400'>Posted On: {dateFormatter(sharedValue[1].date) === 'less than a min ago' ? 'Now' : dateFormatter(sharedValue[1].date)}, {timeFormatter(sharedValue[1].date)}</p>
            </div>
            <div className='mt-2'>
              <h1 className='text-xl text-stone-300'>About the Product Owner</h1>
              <div className='flex items-center gap-2 h-full mt-2'>
                <div className='cursor-pointer' onClick={handleSellerView}>
                  <img src={sharedValue[2].profilePic !== null ? `data:image/jpeg;base64,${sharedValue[2].profilePic}` : `${ProfilePic}`} className='w-24 border-[1px] border-black aspect-square object-cover rounded-md' alt="img" />
                </div>
                <div>
                  <h1 className='text-stone-300'><strong>{sharedValue[2].username}</strong></h1>
                  <p className='text-stone-400'>{sharedValue[2].email}</p>
                  <p className='text-stone-400'>{sharedValue[2].number}</p>
                  <p className='text-stone-400'>{dateFormatter(sharedValue[2].date)}</p>
                </div>
              </div>
              <div className='mt-2'>
                <Button btnStyle={btnNormal} handleOnClick={() => setShowPosts(!showPosts)}>{showPosts ? `Close Posts` : `View Other Posts`}</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='border-2 border-white'>
          {showPosts ? (
            <div className='border-2 border-white'>
              <h1 className='text-center text-2xl text-stone-400 my-2'>{sharedValue[0].productListsWithImage.length === 0 ? `There is no posts` : `Other Posts`}</h1>
              <ul className='ul p-4'>
                {sharedValue[0].productListsWithImage.map((item) => (
                  <li key={item._id} className='bg-zinc-800 rounded-md'>
                    <div>
                      <div><img src={`data:image/jpeg;base64,${item.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                    </div>
                    <div className='p-2'>
                      <h1 className='text-stone-200 font-bold'>{item.productName.length <= 25 ? item.productName : `${item.productName.slice(0, 25)}...`}</h1>
                      <div className='flex flex-col mb-2'>
                        <div className='flex gap-2 items-center justify-between'>
                          <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{item.price}</strong></p>
                          <LinkTab path={`/viewdetails/${item._id}`} >
                            <Button btnStyle={btnView} handleOnClick={() => handleViewDetails(item._id)}>View Details</Button>
                          </LinkTab>
                        </div>

                      </div>
                      <div className='flex justify-end'>
                      </div>
                      <div>
                        <LinkTab path={`/order/${item._id}`}>
                          <Button btnStyle={btnOrder} handleOnClick={() => handleProductOrder(item._id)}>Order Now</Button>
                        </LinkTab>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) :
            (
              <>
                <div></div>
              </>
            )
          }
        </div>
      </div>
    </>
  ) : (

    <>
      <div>
        {viewExistOrder.length !== 0 ? (
          <>
            <Modal ref={imageModal} dialogStyle={'top-0 left-0 my-[8rem] relative rounded-lg mx-auto'}>
              <img src={`data:image/jpeg;base64,${viewExistOrder.data?.imageProduct}` ? `data:image/jpeg;base64,${viewExistOrder.data?.imageProduct}` : ''} className='w-full' alt="" />
              <span onClick={handleImageModalClose} className='text-stone-200 text-4xl rounded-md absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>
            </Modal>
            <div className='p-4'>
              <h1 className='text-center text-4xl text-stone-400 font-bold mb-8 h-auto'>{viewExistOrder.data?.orderedProduct ? `About this Product order` : `About the user's posts`}</h1>
              <div className='flex gap-4 w-full'>
                <div className='w-2/5 h-auto cursor-pointer' onClick={handleImageModalOpen}>
                  <img src={`data:image/jpeg;base64,${viewExistOrder.data?.imageProduct}`} className='w-full aspect-square object-cover rounded-md' alt="product" />
                </div>
                {viewExistOrder.data?.orderedProduct ? (
                  <div className='w-full'>
                    <div className='flex flex-col gap-2 border-b-[1px] border-white'>
                      <p className='text-stone-300 text-3xl font-bold'>{viewExistOrder.data?.orderedProduct.productDetail.productName}</p>
                      <p className='text-stone-400'>Rs. <strong className='text-red-600 text-xl '>{viewExistOrder.data?.orderedProduct.productDetail.price}</strong></p>
                      <p className='text-stone-400'>{viewExistOrder.data?.orderedProduct.productDetail.description}</p>
                      <p className='text-stone-400'>Posted On: {dateFormatter(viewExistOrder.data?.orderedProduct.productDetail.date)} / {timeFormatter(viewExistOrder.data?.orderedProduct.productDetail.date)}</p>
                    </div>
                    <div className='mt-2'>
                      <h1 className='text-3xl text-stone-300 font-bold mb-2'>Ordered By</h1>
                      <p className='text-stone-400'>Name: <strong className='text-xl'>{viewExistOrder.data?.orderedProduct.username}</strong></p>
                      <p className='text-stone-400'>From:  <strong>{viewExistOrder.data?.orderedProduct.location}</strong></p>
                      <p className='text-stone-400'>Contact No.:   <strong>{viewExistOrder.data?.orderedProduct.number}</strong></p>
                      <p className='text-stone-400'>Description:   <strong>{viewExistOrder.data?.orderedProduct.description}</strong></p>
                      <p className='text-stone-400'>Ordered On: {dateFormatter(viewExistOrder.data?.orderedProduct.date)} / {timeFormatter(viewExistOrder.data?.orderedProduct.date)}</p>
                    </div>
                  </div>
                ) : (
                  <div className='w-full'>
                    <div className='flex flex-col gap-2 border-b-[1px] border-white'>
                      <p className='text-stone-300 text-3xl font-bold'>{viewExistOrder.data?.userRequirement.productName}</p>
                      <p className='text-stone-400'>Rs. <strong className='text-red-600 text-xl '>{viewExistOrder.data?.userRequirement.price}</strong></p>
                      <p className='text-stone-400'>{viewExistOrder.data?.userRequirement.description}</p>
                    </div>
                    <div className='mt-2'>
                      <h1 className='text-3xl text-stone-300 font-bold mb-2'>Posted By</h1>
                      <p className='text-stone-400'>Name: <strong className='text-xl'>{viewExistOrder.data?.userRequirement.username}</strong></p>
                      <p className='text-stone-400'>From:  <strong>{viewExistOrder.data?.userRequirement.location}</strong></p>
                      <p className='text-stone-400'>Contact No.:   <strong>{viewExistOrder.data?.userRequirement.number}</strong></p>
                      <p className='text-stone-400'>Ordered On: {dateFormatter(viewExistOrder.data?.userRequirement.date)} / {timeFormatter(viewExistOrder.data?.userRequirement.date)}</p>
                      {/* <div className='mt-2'>
                        {viewExistOrder.data?.isAdmin ? (
                          <Button btnStyle={btnDeleteForAdmin}>Delete Post</Button>
                        ) : (
                          <></>
                        )}
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
           <Modal ref={imageModal} dialogStyle={'top-0 left-0 my-[8rem] relative rounded-lg mx-auto'}>
              <img src={viewSeller.profilePicOfSellerToView ? `data:image/jpeg;base64,${viewSeller.profilePicOfSellerToView}` : `${ProfilePic}`} className='w-full' alt="" />
              <span onClick={handleImageModalClose} className='text-stone-200 text-4xl rounded-md absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>
            </Modal>
            {viewSeller.length !== 0 ? (
              <div className='p-4'>
                <h1 className='text-center text-4xl text-stone-400 font-bold mb-8 h-auto'>About this seller</h1>
                <div className='flex gap-4 w-full'>
                  <div className='w-2/5 h-auto cursor-pointer' onClick={handleImageModalOpen}>
                    <img src={viewSeller.profilePicOfSellerToView ? `data:image/jpeg;base64,${viewSeller.profilePicOfSellerToView}` : `${ProfilePic}`} className='w-full aspect-square object-cover rounded-md' alt="product" />
                  </div>
                  <div className='w-full'>
                    <div className='flex flex-col gap-2 border-b-[1px] border-white'>
                      <p className='text-stone-400'>Name: <strong className='text-xl'>{viewSeller.sellerToView.username}</strong></p>
                      <p className='text-stone-400'>Email:  <strong>{viewSeller.sellerToView.email}</strong></p>
                      <p className='text-stone-400'>Contact No.:   <strong>{viewSeller.sellerToView.number}</strong></p>
                      <p className='text-stone-400'>Category:   <strong>{viewSeller.sellerToView.category}</strong></p>
                      <p className='text-stone-400'>Joined On: {dateFormatter(viewSeller.sellerToView.date)} / {timeFormatter(viewSeller.sellerToView.date)}</p>
                    </div>
                    <div className='mt-2'>
                      <Button btnStyle={btnNormal} handleOnClick={() => setShowPosts(!showPosts)}>{showPosts ? `Close Posts` : `View Other Posts`}</Button>
                    </div>
                  </div>
                </div>
                <div className='border-2 border-white mt-2'>
                  {showPosts ? (
                    <>
                      <h1 className='text-center text-2xl text-stone-400 my-2'>{viewSeller.sellerPostsWithImage.length === 0 ? `There is no posts` : `Other Posts`}</h1>
                      <ul className='ul p-4'>
                        {viewSeller.sellerPostsWithImage.map((item) => (
                          <li key={item._id} className='bg-zinc-800 rounded-md'>
                            <div>
                              <div><img src={`data:image/jpeg;base64,${item.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                            </div>
                            <div className='p-2'>
                              <h1 className='text-stone-200 font-bold'>{item.productName.length <= 25 ? item.productName : `${item.productName.slice(0, 25)}...`}</h1>
                              <div className='flex flex-col mb-2'>
                                <div className='flex gap-2 items-center justify-between'>
                                  <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{item.price}</strong></p>
                                  <LinkTab path={`/viewdetails/${item._id}`} >
                                    <Button btnStyle={btnView} handleOnClick={() => handleViewDetails(item._id)}>View Details</Button>
                                  </LinkTab>
                                </div>

                              </div>
                              <div className='flex justify-end'>
                              </div>
                              <div>
                                <LinkTab path={`/order/${item._id}`}>
                                  <Button btnStyle={btnOrder} handleOnClick={() => handleProductOrder(item._id)}>Order Now</Button>
                                </LinkTab>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <div></div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className='p-4 text-3xl text-stone-300 font-bold animate-pulse'>Loading...</div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default ViewDetails