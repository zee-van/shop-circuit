import React, { useContext, useRef, useState } from 'react'
import { MyContext } from '../../store/MyContext';
import { updateProductBySeller } from '../../Axios';
import Button from '../../buttons/Button';
import LinkTab from '../../links/LinkTab';
import Modal from '../../modal/Modal';
import { IoIosClose } from 'react-icons/io';

function UpdateProduct() {
    const { sharedValue } = useContext(MyContext);
    // console.log(sharedValue)
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null)
    const updateModal = useRef();
    const imageModal = useRef();
    const [showImage, setShowImage] = useState(null);

    const handleShowImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setShowImage(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setShowImage(null);
        }
    }

    const handleUpdateProduct = async (id) => {
        try {
            const result = await updateProductBySeller(id, {
                productName,
                price,
                description,
                image
            })
            // console.log(result)
            updateModal.current.open();
        } catch (error) {
            console.log(error);
        }
    }
    const handleCloseUpdateModal = () => {
        updateModal.current.close();
    }
    const handleImageModalOpen = () => {
        imageModal.current.open();
    }
    const handleImageModalClose = () => {
        imageModal.current.close();
    }
    let btnNormal = 'px-4 py-2 bg-blue-600 text-sm rounded-md hover:bg-blue-800 text-stone-300 uppercase'
    // let btnCancel = 'py-2 px-4 rounded-md uppercase text-sm text-red-600'
    return sharedValue.length !== 0 ? (
        <>
            <Modal ref={updateModal}>
                <div className='w-full px-4 relative h-40 grid place-items-center'>
                    <h1 className='text-xl text-stone-300'>{!image && !productName && !description && !price ? `You haven't update your product.` : `Updated Successfully.`}</h1>
                    <button onClick={handleCloseUpdateModal} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>
            <Modal ref={imageModal} dialogStyle={'top-0 left-0 my-[8rem] relative rounded-lg mx-auto'}>
                <img src={`data:image/jpeg;base64,${sharedValue.image}` ? `data:image/jpeg;base64,${sharedValue.image}` : ``} className='w-full' alt="" />
                <span onClick={handleImageModalClose} className='text-stone-200 text-4xl rounded-md absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>
            </Modal>
            <div className='flex w-full gap-4 p-4'>
                <div className='w-1/3 bg-zinc-900 rounded-md'>
                    <div className='cursor-pointer' onClick={handleImageModalOpen}>
                        <img src={sharedValue.length !== 0 ? (image ? showImage : (`data:image/jpeg;base64,${sharedValue.image}` ? `data:image/jpeg;base64,${sharedValue.image}` : ``)) : ('')} className='w-full aspect-square object-cover rounded-md' alt="product" />
                    </div>
                    <div className='p-4'>
                        <p className='text-2xl font-bold text-stone-300'>{sharedValue.productName}</p>
                        <p className='text-stone-400'>Rs. <strong className='text-2xl text-red-600'>{sharedValue.price}</strong></p>
                        <p className='text-stone-400'>{sharedValue.description}</p>
                        <p className='text-stone-400'>{new Date(sharedValue.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    </div>
                </div>
                <form action="" method='post' className='w-2/3' onSubmit={(e) => e.preventDefault()}>
                    <div className='bg-zinc-900 relative p-4 rounded-md'>
                        <LinkTab path={'/sellers/products'}>
                            <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                        </LinkTab>
                        <h1 className='text-stone-300 text-2xl font-bold mb-8'>Update you product!!!</h1>
                        <div className='flex  flex-col w-full mt-4 gap-4'>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input type="text" placeholder='product name....' name='productName' onChange={(e) => setProductName(e.target.value)} className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md resize-none border-zinc-400 text-stone-400 bg-zinc-800' />
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input type="text" placeholder='product price....' name='price' onChange={(e) => setPrice(e.target.value)} className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md resize-none border-zinc-400 text-stone-400 bg-zinc-800' />
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <textarea placeholder='Description...' onChange={(e) => setDescription(e.target.value)} className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md resize-none  border-zinc-400 text-stone-400 bg-zinc-800' type="text" />
                            </div>
                            <div id='inputbox' className='flex flex-col relative'>
                                <input className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md resize-none  border-zinc-400 bg-zinc-800' type="file" accept="image/*" onChange={handleShowImage} />
                            </div>
                        </div>
                        <div className='mt-4 flex gap-4'>
                            <Button handleOnClick={() => handleUpdateProduct(sharedValue._id)} btnStyle={btnNormal} >Done</Button>
                            <LinkTab path={'/sellers/products'}>
                                <Button btnStyle={btnNormal} >Cancel</Button>
                            </LinkTab>
                        </div>
                    </div>
                </form>
            </div>
        </>
    ) : (
        <>
            <div>
                <h1>Loading...</h1>
            </div>
        </>
    )
}

export default UpdateProduct