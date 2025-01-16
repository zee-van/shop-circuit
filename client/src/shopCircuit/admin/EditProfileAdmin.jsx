import React, { useContext, useRef, useState } from 'react'
import { updatingAdminProfile } from '../Axios';
import LinkTab from '../links/LinkTab';
import { IoIosClose } from 'react-icons/io';
import { MyContext } from '../store/MyContext';
import Modal from '../modal/Modal';

function EditProfileAdmin() {
    const { setProfilePic } = useContext(MyContext)
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState('')
    const [showImage, setShowImage] = useState(null);
    const [imageStyle, setImageStyle] = useState('hidden')
    const updateModal = useRef();

    const handleShowImage = (e) => {
        setImageStyle('flex justify-center items-center gap-2')
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

    const changeProfile = async (e) => {
        e.preventDefault();
        try {
            const uploadedSucces = await updatingAdminProfile({
                username,
                image
            })
            setProfilePic(showImage)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenUpdateModal = () => {
        updateModal.current.open();
    }
    const handleCloseUpdateModal = () => {
        updateModal.current.close();
    }
    return (
        <>
            <Modal ref={updateModal}>
                <div className='w-full px-4 relative h-40 grid place-items-center'>
                    <h1 className='text-xl text-stone-300'>{!image && !username ? `You haven't update your profile.` : `Updated Successfully.`}</h1>
                    <button onClick={handleCloseUpdateModal} className='absolute top-0 right-0 p-4'></button>
                </div>
            </Modal>
            <div className='flex justify-center items-center h-screen'>
                <form action='/admin/edit' method='post' onSubmit={changeProfile} encType='multipart/form-data' className='p-4 border-2 bg-zinc-900 border-zinc-950 flex-col flex w-[30rem] gap-4 rounded-md relative'>
                    <LinkTab path='/admin'>
                        <span className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer'><IoIosClose /></span>
                    </LinkTab>
                    <h1 className='text-2xl font-bold text-stone-300 mb-2'>Update Your Profile</h1>
                    <div className={imageStyle}>
                        <p className='text-xl text-stone-400'>Your profile pic will be look like this!!!</p>
                        {image && <img className='w-24 rounded-full border-[1px] border-black aspect-square object-cover' src={showImage} alt="image" />}
                    </div>
                    <input type="text" placeholder='username....' name='username' onChange={(e) => setUsername(e.target.value)} className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md border-zinc-300 bg-zinc-800' />
                    <input className='py-2 text-xl px-4 w-full outline-none border-2 rounded-md border-zinc-300 bg-zinc-800' type="file" accept="image/*" onChange={handleShowImage} />
                    <button className='py-2 px-4 bg-blue-600 rounded-md' onClick={handleOpenUpdateModal}>Done</button>
                </form>
            </div>
        </>
    )
}

export default EditProfileAdmin