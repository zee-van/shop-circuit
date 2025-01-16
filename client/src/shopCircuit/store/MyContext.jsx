import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [sharedValue, setSharedValue] = useState([]);
    const [searchedItem, setSearchedItem] = useState([]);
    const [viewExistOrder, setViewExistOrder] = useState([]);
    const [viewSeller, setViewSeller] = useState([]);
    const [profilePic, setProfilePic] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const cartItems = [];

    return (
        <MyContext.Provider value={{ sharedValue, setSharedValue, viewExistOrder, setViewExistOrder, viewSeller, setViewSeller, profilePic, setProfilePic, searchedItem, setSearchedItem, isAdmin, setIsAdmin, cartItems }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
