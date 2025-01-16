import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { deleteAllCompletedUserPost, deleteUserPost, viewUserPosts, viewUserRequirementProductByAdmin } from '../Axios';
import Button from '../buttons/Button';
import LinkTab from '../links/LinkTab';
import { MyContext } from '../store/MyContext';
import Modal from '../modal/Modal';

function ViewUserPosts() {
    const [userPosts, setUserPosts] = useState([]);
    const [checkUserPosts, setCheckUserPosts] = useState([]);
    const { setViewExistOrder, setSharedValue } = useContext(MyContext)
    const deleteUserPostModal = useRef();
    const deleteAllCompletedUserPostModal = useRef();
    const [currentId, setCurrentId] = useState('')


    const handleViewUserPosts = async () => {
        try {
            const result = await viewUserPosts();
            const sortedItems = result.data.sort((a, b) => {
                if (a.status === "Completed" && b.status !== "Completed") {
                    return -1; // a comes first
                }
                if (a.status !== "Completed" && b.status === "Completed") {
                    return 1; // b comes first
                }
                return 0; // keep original order for other statuses
            });
            setCheckUserPosts(result)
            setUserPosts(sortedItems)
            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteUserPost = async (id) => {
        try {
            await deleteUserPost(id)
            handleViewUserPosts()
            deleteUserPostModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAllCompletedUserPosts = async () => {
        try {
            await deleteAllCompletedUserPost();
            handleViewUserPosts()
            deleteAllCompletedUserPostModal.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    const handleViewUserPostDetail = async (id) => {
        try {
            const result = await viewUserRequirementProductByAdmin(id);
            setSharedValue([]);
            setViewExistOrder(result)
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenDeleteUserPostModal = (id) => {
        deleteUserPostModal.current.open()
        setCurrentId(id)
    }

    const handleCloseDeleteUserPostModal = () => {
        deleteUserPostModal.current.close()
    }

    const handleOpenDeleteAllCompletedUserPostModal = () => {
        deleteAllCompletedUserPostModal.current.open()
    }

    const handleCloseDeleteAllCompletedUserPostModal = () => {
        deleteAllCompletedUserPostModal.current.close()
    }

    useEffect(() => {
        handleViewUserPosts();
    }, [])

    let btnViewDetails = 'text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4'
    let btnReject = 'py-2 px-4 rounded-md hover:underline font-bold text-sm text-red-600'
    let deleteAll = 'py-2 px-4 rounded-md uppercase text-sm bg-red-600 hover:bg-red-800'
    let btnNormal = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
    let btnCompleted = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-800'
    let btnPending = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600'
    let deleteAllWithDesire = 'mt-2 flex gap-2 justify-end p-4 fixed bottom-0 right-0 bg-zinc-900 rounded-md'

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
                            {checkUserPosts.data ? (
                                userPosts.length !== 0 ? (
                                    userPosts.map((post) => {
                                        return (
                                            <li key={post._id} className='bg-zinc-900 rounded-md flex flex-col'>
                                                <Modal ref={deleteUserPostModal}>
                                                    <div className='p-4'>
                                                        <h1 className='text-xl mt-2 text-stone-300'>Are you sure want to Delete.</h1>
                                                        <p className='text-stone-400 mt-4'>This will delete this post permanently.</p>
                                                        <div className='mt-8 flex gap-4 justify-end'>
                                                            <Button handleOnClick={() => handleDeleteUserPost(currentId)} btnStyle={btnNormal}>Yes</Button>
                                                            <Button handleOnClick={handleCloseDeleteUserPostModal} btnStyle={btnNormal}>No</Button>
                                                        </div>
                                                    </div>
                                                </Modal>
                                                <Modal ref={deleteAllCompletedUserPostModal}>
                                                    <div className='p-4'>
                                                        <h1 className='text-xl mt-2 text-stone-300'>Are you sure want to Delete All Completed User Posts.</h1>
                                                        <p className='text-stone-400 mt-4'>This will delete these post permanently.</p>
                                                        <div className='mt-8 flex gap-4 justify-end'>
                                                            <Button handleOnClick={handleDeleteAllCompletedUserPosts} btnStyle={btnNormal}>Yes</Button>
                                                            <Button handleOnClick={handleCloseDeleteAllCompletedUserPostModal} btnStyle={btnNormal}>No</Button>
                                                        </div>
                                                    </div>
                                                </Modal>
                                                <div>
                                                    <div><img src={`data:image/jpeg;base64,${post.image}`} className='w-full aspect-square object-cover rounded-md' alt="img" /></div>
                                                </div>
                                                <div className='p-2'>
                                                    <div className='border-b-2 border-stone-300'>
                                                        <h1 className='text-stone-200 text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{post.productName}</h1>
                                                        <div className='flex flex-col mb-2'>
                                                            <p className='text-sm text-stone-400 font-bold'>Rs. <strong className='text-red-600 text-xl'>{post.price}</strong></p>
                                                        </div>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <h1 className='text-stone-300'>Posted by: <strong>{post.username}</strong></h1>
                                                        <p className='text-stone-400'>Number: {post.number}</p>
                                                        <p className='text-stone-400'>Location: {post.location ? (post.location.length <= 25 ? post.location : `${post.location.slice(0, 25)}...`) : `Not Provided`}</p>
                                                        {/* <p className='text-stone-400'>Posted On: {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p> */}
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <Button btnStyle={post.status === 'Completed' ? btnCompleted : btnPending}>{post.status}</Button>
                                                        <Button btnStyle={btnReject} handleOnClick={() => handleOpenDeleteUserPostModal(post._id)}>Delete</Button>
                                                        <LinkTab path={`/viewdetails/${post._id}`} >
                                                            <Button btnStyle={btnViewDetails} handleOnClick={() => handleViewUserPostDetail(post._id)}>View Details</Button>
                                                        </LinkTab>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <div className='text-3xl font-bold text-stone-300 animate-pulse'>No items</div>
                                )
                            ) : (
                                <div className='text-3xl font-bold text-stone-300 animate-pulse'>Loading...</div>
                            )}
                        </ul>
                        <div className={checkUserPosts.data ? (checkUserPosts.data.length > 1 ? deleteAllWithDesire : `${deleteAllWithDesire} hidden`): ('hidden')}>
                       <Button btnStyle={deleteAll} handleOnClick={handleOpenDeleteAllCompletedUserPostModal}>Delete All Completed Posts</Button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewUserPosts