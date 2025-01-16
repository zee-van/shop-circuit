import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './shopCircuit/navbar/Navbar'
import Login from './shopCircuit/login_register/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './shopCircuit/homepage/Home'
import Register from './shopCircuit/login_register/Register'
import AdminRegister from './shopCircuit/login_register/AdminRegister'
import Sellers from './shopCircuit/sellers/Sellers'
import NewOrder from './shopCircuit/sellers/sellertab/NewOrder'
import AcceptedOrder from './shopCircuit/sellers/sellertab/AcceptedOrder'
import Upload from './shopCircuit/sellers/sellertab/Upload'
import Products from './shopCircuit/sellers/sellertab/Products'
import Admin from './shopCircuit/admin/Admin'
import NewSeller from './shopCircuit/admin/NewSeller'
import ViewSeller from './shopCircuit/admin/ViewSeller'
import ViewAllProducts from './shopCircuit/admin/ViewAllProducts'
import EditProfile from './shopCircuit/sellers/EditProfile'
import EditProfileAdmin from './shopCircuit/admin/EditProfileAdmin'
import UserPost from './shopCircuit/user/UserPost'
import ViewDetails from './shopCircuit/user/ViewDetails'
import { MyProvider } from './shopCircuit/store/MyContext'
import UpdateProduct from './shopCircuit/sellers/sellertab/UpdateProduct'
import NewExistOrder from './shopCircuit/sellers/sellertab/NewExistOrder'
import UserOrder from './shopCircuit/user/UserOrder'
import ViewUserPosts from './shopCircuit/admin/ViewUserPosts'
import { checkAdmin, checkSeller } from './AllFunctions'
import ShowPopUp from './shopCircuit/protectedroute/ShowPopUp'

function App() {

  const [isSeller, setIsSeller] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);


  //for admin protected route
  const handleCheckAdmin = async () => {
    try {
      await checkAdmin();
    } catch (error) {
      console.error('Error checking admin access:', error);
    }
  }

  //for seller route//
  const handleCheckSeller = async () => {
    try {
      await checkSeller();
    } catch (error) {
      console.error('Error checking admin access:', error);
    }
  }

  useEffect(() => {
    handleCheckAdmin();
    handleCheckSeller();
  }, [])

  useEffect(() => {
    const checkPermissions = async () => {
      const result = await checkAdmin();
      setIsAdmin(result);
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    const checkPermissions = async () => {
      const result = await checkSeller();
      setIsSeller(result);
    };
    checkPermissions();
  }, []);

  if (isAdmin === null || isSeller === null) {
    return <div className='text-3xl text-center mt-[10rem] font-bold text-stone-300 animate-pulse'>Loading...</div>;
  }
  return (
    <>
      <MyProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={!isAdmin && !isSeller ? <Login /> : <ShowPopUp />} />
            <Route path='/register' element={isAdmin ? <Register /> : (!isAdmin && !isSeller ?  <Register /> : <ShowPopUp /> )} />
            {/* <Route path='/adminregister' element={isAdmin ? <AdminRegister /> : <ShowPopUp />} /> */}
            <Route path='/sellers' element={isSeller ? <Sellers /> : <ShowPopUp />} />
            <Route path='/sellers/products' element={isSeller ? <Products /> : <ShowPopUp />} />
            <Route path='/sellers/neworder' element={isSeller ? <NewOrder /> : <ShowPopUp />} />
            <Route path='/sellers/newuserposts' element={isSeller ? <NewExistOrder /> : <ShowPopUp />} />
            <Route path='/sellers/acceptedorder' element={isSeller ? <AcceptedOrder /> : <ShowPopUp />} />
            <Route path='/sellers/upload' element={isSeller ? <Upload /> : <ShowPopUp />} />
            <Route path='/sellers/edit' element={isSeller ? <EditProfile /> : <ShowPopUp />} />
            <Route path='/sellers/products/:id' element={isSeller ? <UpdateProduct /> : <ShowPopUp />} />
            <Route path='/admin' element={isAdmin ? <Admin /> : <ShowPopUp />} />
            <Route path='/admin/edit' element={isAdmin ? <EditProfileAdmin /> : <ShowPopUp />} />
            <Route path='/admin/viewallproducts' element={isAdmin ? <ViewAllProducts /> : <ShowPopUp />} />
            <Route path='/admin/viewnewsellers' element={isAdmin ? <NewSeller /> : <ShowPopUp />} />
            <Route path='/admin/viewsellers' element={isAdmin ? <ViewSeller /> : <ShowPopUp />} />
            <Route path='/admin/viewuserposts' element={isAdmin ? <ViewUserPosts /> : <ShowPopUp />} />
            <Route path='/yourrequirement' element={<UserPost />} />
            <Route path='/viewdetails/:id' element={<ViewDetails />} />
            <Route path='/order/:id' element={<UserOrder />} />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </>
  )
}

export default App
