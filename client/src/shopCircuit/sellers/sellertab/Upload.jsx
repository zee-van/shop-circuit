import React, { useRef, useState } from 'react'
import SideBar from './SideBar'
import Header from '../Header'
import { PRODUCT_CATEGORY } from '../../categories/category';
import { TiArrowSortedDown } from 'react-icons/ti';
import { uploadItemBySeller } from '../../Axios';
import { FaRegImage } from "react-icons/fa6";
import Modal from '../../modal/Modal';
import LinkTab from '../../links/LinkTab';
import { IoIosClose } from 'react-icons/io';


function Upload() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [imageStyle, setImageStyle] = useState('w-1/3 hidden rounded-md')
    const [error, setError] = useState('');
    const uploadModal = useRef();

    const handleShowImage = (e) => {
        setImageStyle('w-1/3')
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


    const handleInputValiate = () => {
        setError('');
        if (productName === '' || description === '' || price === '' || !image) {
            setError("Please provide value for all input fields");
            return false;
        } else {
            return true;
        }
    }

    const uploadedItem = async (e) => {
        try {
            const uploadedSucces = await uploadItemBySeller({
                productName,
                price,
                description,
                image
            })
            uploadModal.current.open();
            console.log(uploadedSucces)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleUploadModalOpen = () => {
    //     uploadModal.current.open();
    // }

    const handleUploadModalClose = () => {
        uploadModal.current.close();
    }

    return (
        <>
            <Modal ref={uploadModal}>
                <div className='w-full px-4 relative h-40 grid place-items-center'>
                    <h1 className='text-xl text-stone-300'>{!image && !productName && !description && !price ? `All input fields are needed.` : `Uploaded Successfully.`}</h1>
                    <button onClick={handleUploadModalClose} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>

            <div className='flex'>
                <SideBar />
                <div className='w-full'>
                    <div>
                        <Header />
                    </div>
                    <form method='post' action='/sellers/upload' onSubmit={(e) => e.preventDefault()} encType='multipart/form-data' className='flex justify-center gap-4 p-4'>
                        <div className={imageStyle}>
                            {image && <img className='w-full rounded-md aspect-square object-cover' src={showImage} alt="image" />}
                        </div>
                        <div className='flex flex-col w-[35rem] relative justify-center text-stone-400 gap-4 p-4 bg-zinc-900 border-2 border-zinc-950 rounded-md'>
                            <LinkTab path={'/sellers'}>
                                <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                            </LinkTab>
                            <h1 className='text-3xl font-bold'>Upload your product here</h1>
                            <span className='text-red-600'>{error}</span>
                            <input placeholder='Name of product...' onChange={(e) => setProductName(e.target.value)} className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md  border-zinc-300 bg-zinc-800' type="text" />
                            <input placeholder='Price...' onChange={(e) => setPrice(e.target.value)} className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md  border-zinc-300 bg-zinc-800' type="number" />
                            <textarea placeholder='Description...' onChange={(e) => setDescription(e.target.value)} className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md resize-none  border-zinc-300 bg-zinc-800' type="text" />
                            <input className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md  border-zinc-300 bg-zinc-800' type="file" accept="image/*" onChange={handleShowImage} />
                            <div className='flex gap-4'>
                                <button className='py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-800' onClick={() => { if (handleInputValiate()) { uploadedItem() } }}>Upload</button>
                                <LinkTab path={'/sellers'}>
                                    <button className='py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-800'>Cancel</button>
                                </LinkTab>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Upload