import axios from 'axios';
const API_URL = 'http://localhost:8081';



// ------------------- logout ------------------------------//


export const logout = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/logout`,
        withCredentials: true,
        credentials: 'include'
    }
    return await axios.request(config).then((response) => {
        return response
    })
}


//------------------- Admin parts ------------------------------//

export const registerAdmin = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/adminregister`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: data
    };
    return axios.request(config).then((respnse) => {
        return respnse;
    });
};


export const registerSeller = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: data
    };
    return axios.request(config).then((respnse) => {
        return respnse;
    });
};


export const loginSeller = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        data: data
    }
    return axios.request(config).then((response) => {
        return response;
    })
}

export const allProductLists = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin/viewallproducts`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const deleteSpecificProduct = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/admin/viewallproducts/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}



export const allProductListsOfHome = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/viewallproducts`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}


export const SellerLists = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin/viewsellers`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const newSellerLists = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin/viewnewsellers`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const viewUserPosts = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin/viewuserposts`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true

    }
    return axios.request(config).then((response) => {
        return response
    })
}

export const deleteUserPost = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/admin/viewuserposts/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const deleteAllCompletedUserPost = async () => {
    let config = {
        method: 'delete',
        url: `${API_URL}/admin/deleteAllCompletedPosts`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}




export const updatedSeller = async (id) => {
    let config = {
        method: 'post',
        url: `${API_URL}/admin/viewnewsellers/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const approveAllSeller = async () => {
    let config = {
        method: 'post',
        url: `${API_URL}/admin/approveall`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const viewSpecificSeller = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin/viewsellers/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const deleteSeller = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/admin/viewnewsellers/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const deleteAllSeller = async () => {
    let config = {
        method: 'delete',
        url: `${API_URL}/admin/rejectall`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const viewsellers = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin/viewsellers`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const deleteApproveSeller = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/admin/viewsellers/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const adminDetails = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const updatingAdminProfile = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/admin/edit`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const viewUserRequirementProductByAdmin = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/admin/viewnewuserpost/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}


//--------------------------- sellers parts ------------------------------------------//

export const uploadItemBySeller = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/sellers/upload`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const listedProducts = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers/products`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const selectedProductBySeller = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers/products/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const updateProductBySeller = async (id, data) => {
    let config = {
        method: 'put',
        url: `${API_URL}/sellers/products/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}



export const deleteProductBySeller = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/sellers/products/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const SellerDetails = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const newOrderFromUser = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers/neworder`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const completeNewOrderFromUser = async (id) => {
    let config = {
        method: 'put',
        url: `${API_URL}/sellers/neworder/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const deleteNewOrderFromUser = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/sellers/neworder/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const newExistingOrderFromUser = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers/newexistorder`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}



export const acceptExistingProduct = async (id) => {
    let config = {
        method: 'put',
        url: `${API_URL}/sellers/newexistorder/accept/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const acceptedExistingProduct = async () => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers/newexistorder/accepted`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const rejectExistingProduct = async (id) => {
    let config = {
        method: 'delete',
        url: `${API_URL}/sellers/newexistorder/reject/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const viewExistingOrderedProduct = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers/viewexistorder/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}

export const viewUserRequirementProduct = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/sellers/viewnewuserpost/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response;
    })
}


export const updatingSellerProfile = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/sellers/edit`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}


//----------------------- User Parts -------------------------//

export const yourRequirement = async (data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/yourRequirement`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}


export const viewDetails = async (id) => {
    let config = {
        method: 'get',
        url: `${API_URL}/viewdetails/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const productOrder = async (id, data) => {
    let config = {
        method: 'post',
        url: `${API_URL}/order/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: data
    }
    return await axios.request(config).then((response) => {
        return response
    })
}

export const searchedProduct = async (query) => {
    let config = {
        method: 'get',
        url: `${API_URL}/searchitem/${query}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    }
    return await axios.request(config).then((response) => {
        return response
    })
}








