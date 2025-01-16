const express = require('express');
const cors = require('cors');
const app = express();
const adminModel = require('./models/admin');
const bcrypt = require('bcrypt');
const sellerModel = require('./models/sellers');
const sellerPostsModel = require('./models/sellerPosts');
const userPostsModel = require('./models/userPosts')
const newOrderModel = require('./models/newOrder')
const acceptedOrderModel = require('./models/acceptedOrder')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const { ObjectId } = require('mongodb');
const userPosts = require('./models/userPosts');
const sellers = require('./models/sellers');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Welcome');
})

//---------------- MiddleWares --------------------//

// async function isAdmin(req, res, next) {
//     let admin = await adminModel.findOne({ role: 'admin' });
//     if (!admin) {
//         return res.send("Admin is already exist");
//     } else {
//         let data = jwt.verify(req.cookies.token, 'xiaomeng');
//         req.adminTrue = data;
//         next();
//     }
// }

// const isAdminLoggedIn = (async (req, res, next) => {
//     let admin = await adminModel.findOne({ role: req.body.role, email: req.body.email });
//     if (!admin) {
//         return res.send("You can't add an admin.")
//     }
//     neconstxt();
// })

// async function isApprovedseller(req, res, next) {
//     let seller = await sellerModel.findOne({ role: 'seller' })
//     if (!seller) {
//         res.send("You are not an approved seller");
//     } else {

//         next();
//     }
// }

function isLoggedIn(req, res, next) {
    const isUser = req.cookies.token ? true : false;
    if (!isUser) {
        return res.send("You must logged in first");
    }
    try {
        let data = jwt.verify(req.cookies.token, 'xiaomeng');
        req.user = data;
        next();
    } catch (error) {
        return res.send("invalid Access")
    }

}


function isSeller(req, res, next) {
    const isSeller = req.user.role === 'seller' ? true : false;
    if (!req.user || !isSeller) {
        return res.send('Invalid seller');
    }
    next();
}

function isAdmin(req, res, next) {
    const isAdmin = req.user.role === 'admin' ? true : false;
    if (!req.user || !isAdmin) {
        return res.send('Invalid admin');
    }
    next();
}


//----------------- Admin parts only -------------------//

app.post('/adminregister', isLoggedIn, isAdmin, async (req, res) => {
    try {

        let { number, username, email, password, conformPassword, profilePic } = req.body;
        let seller = await sellerModel.findOne({ email });
        let admin = await adminModel.findOne({ email });
        if (seller || admin) return res.send("Email is already exist");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const createdAdmin = await adminModel.create({
                    number,
                    username,
                    email,
                    password: hash,
                    conformPassword: hash,
                })
                // let token = jwt.sign({ email }, 'yanmeng')
                // res.cookie('token', token);
                res.send(createdAdmin);
            })
        })
    } catch (error) {
        console.log(error)
    }


})

// app.post('/admin/addadmin', isLoggedIn, isAdmin, async (req, res) => {
//     try {

//         let { number, username, email, password, conformPassword, profilePic } = req.body;
//         let seller = await sellerModel.findOne({ email });
//         let admin = await adminModel.findOne({ email });
//         if (seller || admin) return res.send("Email is already exist");

//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(password, salt, async (err, hash) => {
//                 const createdAdmin = await adminModel.create({
//                     number,
//                     username,
//                     email,
//                     password: hash,
//                     conformPassword: hash,
//                 })
//                 // let token = jwt.sign({ email }, 'yanmeng')
//                 // res.cookie('token', token);
//                 res.send(createdAdmin);
//             })
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

app.get('/admin/viewallproducts', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const productLists = await sellerPostsModel.find();
        const productListsWithImage = productLists.map((product) => {
            const imageProduct = product.image ? product.image.toString('base64') : null;
            return {
                ...product.toObject(),
                image: imageProduct
            };
        })
        res.json(productListsWithImage);
    } catch (error) {

    }
})

app.delete('/admin/viewallproducts/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const productToDelete = await sellerPostsModel.findOneAndDelete({ _id: req.params.id });
        res.send(productToDelete);
    } catch (error) {

    }
})

app.get('/admin/viewnewsellers', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let sellerLists = await sellerModel.find({ role: '' });
        res.json(sellerLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


app.post('/admin/viewnewsellers/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let updateseller = await sellerModel.updateOne(
            { _id: req.params.id },
            { $set: { role: 'seller' } }
        )
        res.send(updateseller);
    } catch (error) {
        console.log(error);
    }
})

app.post('/admin/approveall', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let updateAllseller = await sellerModel.updateMany(
            { role: "" },
            { $set: { role: 'seller' } }
        )
        res.send(updateAllseller);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/admin/viewnewsellers/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let deleteseller = await sellerModel.findOneAndDelete(
            { _id: req.params.id },
        )
        res.send(deleteseller);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/admin/rejectall', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let deleteAllseller = await sellerModel.deleteMany({ role: "" })
        res.send(deleteAllseller);
    } catch (error) {
        console.log(error);
    }
})

app.get('/admin/viewsellers', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let allsellers = await sellerModel.find({ role: 'seller' });
        const sellersWithImages = allsellers.map((seller) => {
            const imageseller = seller.profilePic ? seller.profilePic.toString('base64') : null;
            return {
                ...seller.toObject(),
                profilePic: imageseller
            };
        });
        res.json(sellersWithImages)
    } catch (error) {
        console.log(error)
    }
})

app.get('/admin/viewuserposts', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let userPosts = await userPostsModel.find();
        const userPostsWithImage = userPosts.map((post) => {
            const imagePosts = post.image ? post.image.toString('base64') : null
            return {
                ...post.toObject(),
                // image: imagePosts
            }
        })
        res.json(userPostsWithImage);
    } catch (error) {
        console.log(error)
    }
})

app.delete('/admin/viewuserposts/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const deleteUserPost = await userPostsModel.findOneAndDelete({ _id: req.params.id })
        const matchedCategorySeller = await sellerModel.find({ category: deleteUserPost.category })
        const postToRemove = new ObjectId(req.params.id);
        const deleteIdFromUserPosts = matchedCategorySeller.map(async (seller) => {
            seller.userPosts = seller.userPosts.filter(item => !item.equals(postToRemove))
            await seller.save();
        })
        res.send({ deleteUserPost, deleteIdFromUserPosts })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/admin/deleteAllCompletedPosts', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const deleteAllCompletedUserPost = await userPostsModel.find({ status: "Completed" });
        const deleteAllCompletedUserPosts = await userPostsModel.deleteMany({ status: "Completed" })
        const sellers = await sellerModel.find({ userPosts: { $ne: [] } });

        for (const seller of sellers) {
            for (const post of deleteAllCompletedUserPost) {
                seller.userPosts = seller.userPosts.filter(item => !item.equals(post._id));
                await seller.save();
            }
        }
        res.send({ deleteAllCompletedUserPosts })
    } catch (error) {
        console.log(error)
    }
})

app.get('/admin/viewsellers/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let sellerToView = await sellerModel.findOne({ _id: req.params.id })
        let sellersPosts = await sellerPostsModel.find({ productOwner: sellerToView._id })
        const sellerPostsWithImage = sellersPosts.map((product) => {
            const imageProduct = product.image ? product.image.toString('base64') : null
            return {
                ...product.toObject(),
                image: imageProduct
            }
        })
        const profilePicOfSellerToView = sellerToView.profilePic ? sellerToView.profilePic.toString('base64') : null
        res.json({ sellerToView, profilePicOfSellerToView, sellerPostsWithImage })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/admin/viewsellers/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let deleteseller = await sellerModel.findOneAndDelete(
            { _id: req.params.id },
        )
        let deletesellerData = await sellerPostsModel.deleteMany(
            { productOwner: req.params.id },
        )
        let deleteUsersOrderToThatseller = await newOrderModel.deleteMany(
            { sellerId: req.params.id },
        )
        res.send({ deleteseller, deletesellerData, deleteUsersOrderToThatseller });
    } catch (error) {
        console.log(error);
    }
})

app.get('/admin', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let loggedAdmin = await adminModel.findOne({ email: req.user.email })
        let profilePicOfAdmin = loggedAdmin.profilePic ? loggedAdmin.profilePic.toString('base64') : null;
        res.json({
            role: loggedAdmin.role,
            number: loggedAdmin.number,
            username: loggedAdmin.username,
            email: loggedAdmin.email,
            password: loggedAdmin.password,
            conformPassword: loggedAdmin.conformPassword,
            profilePic: profilePicOfAdmin,
            date: loggedAdmin.date
        });

    } catch (error) {
        console.log(error)
    }
})

app.post('/admin/edit', isLoggedIn, isAdmin, upload.single('image'), async (req, res) => {
    try {
        let loggedAdmin = await adminModel.findOne({ email: req.user.email })
        let { username } = req.body
        let updateAdmin = await adminModel.updateOne(
            { email: loggedAdmin.email },
            {
                $set: {
                    username: username ? username : loggedAdmin.username,
                    profilePic: req.file && req.file.buffer ? req.file.buffer : loggedAdmin.profilePic
                }
            }
        )
        res.send(updateAdmin);
    } catch (error) {
        console.log(error);
    }
})

app.get('/admin/viewnewuserpost/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let userRequirement = await userPostsModel.findOne({ _id: req.params.id })
        const imageProduct = userRequirement.image ? userRequirement.image.toString('base64') : null;
        res.json({ userRequirement, imageProduct, isAdmin: 'yes' });
    } catch (error) {
        console.log(error)
    }
})






// ----------------------------- sellers and Admin parts (registers, login and logout) ----------------------------------//

app.post('/register', async (req, res) => {
    try {
        let { role, date, profilePic, number, username, email, password, conformPassword, category } = req.body;
        let seller = await sellerModel.findOne({ email });
        let admin = await adminModel.findOne({ email });
        if (seller) return res.send("Email is already exist");
        if (admin) return res.send("Email is already exist");

        bcrypt.genSalt(10, (ree, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const createseller = await sellerModel.create({
                    number,
                    username,
                    email,
                    password: hash,
                    conformPassword: hash,
                    category
                })
                // let token = jwt.sign({ email, role }, 'xiaomeng')
                // res.cookie('token', token);
                res.send(createseller);
            })
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let admin = await adminModel.findOne({ email, role: 'admin' });
        let seller = await sellerModel.findOne({ email, role: 'seller' });
        let onlyRegisterdseller = await sellerModel.findOne({ email, role: '' });
        if (onlyRegisterdseller) return res.send('Not approved yet')
        if (!admin && !seller) return res.send('Not found')
        const expiresInDays = 15;
        const expiresDate = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

        if (admin) {
            bcrypt.compare(password, admin.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ email: admin.email, role: admin.role }, 'xiaomeng')
                    res.cookie('token', token, { expires: expiresDate, httpOnly: false, path: '/' });
                    res.send("You have logged in");
                } else {
                    res.send("Incorrect email or password");
                }
            })
        } else if (seller) {
            bcrypt.compare(password, seller.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ email: seller.email, role: seller.role }, 'xiaomeng')
                    res.cookie('token', token, { expires: expiresDate, httpOnly: false, path: '/' });
                    res.send("You have logged in");
                } else {
                    res.send("Incorrect email or password");
                }
            })
        } else {
            return res.send("Email or Password is incorrect");
        }
    } catch (error) {
        console.log(error)
    }

})


app.get('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            path: '/',
        })
        // res.cookie('token', '', { httpOnly: true }, { path: '/' }, {expires: new Date(0)});
        res.send("Cookie cleared")
    } catch (error) {
        console.log(error)
    }
})


//------------------------------ sellers parts --------------------------------//

app.post('/sellers/upload', isLoggedIn, isSeller, upload.single('image'), async (req, res) => {
    try {
        let sellerId = await sellerModel.findOne({ email: req.user.email })
        let { productName, description, price } = req.body;
        let uploadedItemByseller = await sellerPostsModel.create({
            productName,
            price,
            category: sellerId.category,
            description,
            image: req.file.buffer,
            productOwner: sellerId._id
        })
        sellerId.sellerPosts.push(uploadedItemByseller._id);
        await sellerId.save();
        res.send(uploadedItemByseller);
    } catch (error) {
        console.log(error)
    }

})

app.get('/sellers/products', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email })
        const allProducts = await sellerPostsModel.find({ productOwner: loggedseller._id });
        const productsWithImages = allProducts.map((product) => {
            const imageProduct = product.image ? product.image.toString('base64') : null;
            return {
                ...product.toObject(),
                image: imageProduct
            };
        });
        res.json(productsWithImages);

    } catch (error) {
        console.log(error)
    }
})

app.get('/sellers/products/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email })
        let productToUpdate = await sellerPostsModel.findOne({ _id: req.params.id })
        let productImage = productToUpdate.image ? productToUpdate.image.toString('base64') : null;

        res.json({
            _id: req.params.id,
            productName: productToUpdate.productName,
            image: productImage,
            description: productToUpdate.description,
            price: productToUpdate.price,
            date: productToUpdate.date,
            category: productToUpdate.category
        });
    } catch (error) {
        console.log(error);
    }
})

app.put('/sellers/products/:id', isLoggedIn, isSeller, upload.single('image'), async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email })
        let productToUpdate = await sellerPostsModel.findOne({ _id: req.params.id })
        let { productName, image, description, price, date } = req.body;

        let updateProduct = await sellerPostsModel.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    productName: productName ? productName : productToUpdate.productName,
                    description: description ? description : productToUpdate.description,
                    price: price ? price : productToUpdate.price,
                    date,
                    image: req.file && req.file.buffer ? req.file.buffer : image
                }
            },
            { new: true }
        )
        res.send(updateProduct);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/sellers/products/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let seller = await sellerModel.findOne({ email: req.user.email })
        const postToRemove = new ObjectId(req.params.id);
        seller.sellerPosts = seller.sellerPosts.filter(item => !item.equals(postToRemove))
        await seller.save();
        let deleteProduct = await sellerPostsModel.findOneAndDelete(
            { _id: req.params.id },
        )
        res.send(deleteProduct);
    } catch (error) {
        console.log(error);
    }
})

// app.get('/sellers/neworder', isLoggedIn, isSeller, async (req, res) => {
//     try {
//         let loggedseller = await sellerModel.findOne({ email: req.user.email })
//         const allProducts = await userPostsModel.find({ category: loggedseller.category });

//         const productsWithImages = allProducts.map((product) => {
//             const imageProduct = product.image ? product.image.toString('base64') : null;
//             return {
//                 ...product.toObject(),
//                 image: imageProduct
//             };
//         });
//         res.json(productsWithImages);

//     } catch (error) {
//         console.log(error)
//     }
// })
// app.get('/hello', async (req, res) => {
//     const seller = await sellerModel.updateMany({ category: "Anime Dress" }, { $set: { userPosts: [] } });
//     res.send(seller)
// })
app.get('/sellers/neworder', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email })
        const productsWithImages = await Promise.all(loggedseller.userPosts.map(async (product) => {
            const listedProduct = await userPostsModel.findOne({ _id: product })
            const listedProductWithImage = listedProduct.image ? listedProduct.image.toString('base64') : null;
            return {
                listedProduct,
                image: listedProductWithImage
            }
        }))
        res.json(productsWithImages)

    } catch (error) {
        console.log(error)
    }
})



app.put('/sellers/neworder/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email });
        let completedOrder = await userPostsModel.updateOne(
            { _id: req.params.id },
            { $set: { status: 'Completed' } }
        )
        res.send(completedOrder);
    } catch (error) {
        console.log(error)
    }
})

app.delete('/sellers/neworder/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email });
        const postToRemove = new ObjectId(req.params.id);
        loggedseller.userPosts = loggedseller.userPosts.filter(item => !item.equals(postToRemove))
        await loggedseller.save();
        res.send(loggedseller)
    } catch (error) {
        console.log(error)
    }
})

app.get('/sellers/newexistorder', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email });
        let orderedProducts = await newOrderModel.find({ sellerId: loggedseller._id });
        const productsWithImages = orderedProducts.map((product) => {
            const imageProduct = product.productDetail.image ? product.productDetail.image.toString('base64') : null;
            return {
                ...product.toObject(),
                image: imageProduct
            };
        });
        res.json({ productsWithImages })

    } catch (error) {
        console.log(error)
    }
})

app.put('/sellers/newexistorder/accept/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email });
        let acceptedOrder = await newOrderModel.updateOne(
            { _id: req.params.id },
            { $set: { status: 'Accepted' } }
        )
        res.send(acceptedOrder);
    } catch (error) {
        console.log(error)
    }
})

app.get('/sellers/newexistorder/accepted', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email });
        let acceptedOrder = await newOrderModel.find({ sellerId: loggedseller._id, status: 'Accepted' })
        const productsWithImages = acceptedOrder.map((product) => {
            const imageProduct = product.productDetail.image ? product.productDetail.image.toString('base64') : null;
            return {
                ...product.toObject(),
                image: imageProduct
            };
        });
        res.json({ productsWithImages })
    } catch (error) {
        console.log(error)
    }
})


app.delete('/sellers/newexistorder/reject/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let productToDelete = await newOrderModel.findOneAndDelete({ _id: req.params.id });
        res.send(productToDelete);
    } catch (error) {
        console.log(error)
    }
})

app.get('/sellers/viewexistorder/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let orderedProduct = await newOrderModel.findOne({ _id: req.params.id })
        // const productsWithImages = orderedProduct.map((product) => {
        const imageProduct = orderedProduct.productDetail.image ? orderedProduct.productDetail.image.toString('base64') : null;
        //     // return {
        //     //     ...product.toObject(),
        //     //     image: imageProduct
        //     // };
        // });
        res.json({ orderedProduct, imageProduct });
    } catch (error) {
        console.log(error)
    }
})

app.get('/sellers/viewnewuserpost/:id', isLoggedIn, isSeller, async (req, res) => {
    try {
        let userRequirement = await userPostsModel.findOne({ _id: req.params.id })
        const imageProduct = userRequirement.image ? userRequirement.image.toString('base64') : null;
        res.json({ userRequirement, imageProduct });
    } catch (error) {
        console.log(error)
    }
})




app.get('/sellers', isLoggedIn, isSeller, async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email })
        let profilePicOfseller = loggedseller.profilePic ? loggedseller.profilePic.toString('base64') : null;
        res.json({
            role: loggedseller.role,
            number: loggedseller.number,
            username: loggedseller.username,
            email: loggedseller.email,
            password: loggedseller.password,
            conformPassword: loggedseller.conformPassword,
            category: loggedseller.category,
            profilePic: profilePicOfseller,
            date: loggedseller.date,
            sellerPosts: loggedseller.sellerPosts
        });

    } catch (error) {
        console.log(error)
    }
})


app.post('/sellers/edit', isLoggedIn, isSeller, upload.single('image'), async (req, res) => {
    try {
        let loggedseller = await sellerModel.findOne({ email: req.user.email })
        let { username } = req.body;
        let updateseller = await sellerModel.updateOne(
            { email: loggedseller.email },
            {
                $set: {
                    username: username ? username : loggedseller.username,
                    profilePic: req.file && req.file.buffer ? req.file.buffer : loggedseller.profilePic
                }
            }
        )
        res.send({ updateseller, profilePic: req.file && req.file.buffer ? req.file.buffer : null });
    } catch (error) {
        console.log(error);
    }
})


// app.get('/update', async (req, res) => {
//     const updateAdmin = await sellerModel.updateMany(
//         {role: 'seller'},
//         {$set: {role: 'seller'}}
//     )
//     res.send(updateAdmin)
// })

//------------------------------- All User -----------------------------------//

app.get('/viewallproducts', async (req, res) => {
    try {
        const productLists = await sellerPostsModel.find();
        const productListsWithImage = productLists.map((product) => {
            const imageProduct = product.image ? product.image.toString('base64') : null;
            return {
                ...product.toObject(),
                image: imageProduct
            };
        })
        res.json(productListsWithImage);
    } catch (error) {

    }
})

//-------------------------------------- User Requirements Posts Parts ------------------------------//

app.post('/yourRequirement', upload.single('image'), async (req, res) => {
    try {
        let { number, username, productName, description, price, category, location } = req.body;
        let matchedSellers = await sellerModel.find({ category: category });
        const userRequirement = await userPostsModel.create({
            number,
            username,
            productName,
            image: req.file.buffer,
            description,
            price,
            category,
            location
        })
        const pushUserRequirement = matchedSellers.map(async (seller) => {
            seller.userPosts.push(userRequirement._id);
            await seller.save();
        })
        res.send(userRequirement);
    } catch (error) {
        console.log(error)
    }
})

app.get('/viewdetails/:id', async (req, res) => {
    try {
        const product = await sellerPostsModel.findOne({ _id: req.params.id });
        const productOwner = await sellerModel.findOne({ _id: product.productOwner });
        const products = await sellerPostsModel.find({ productOwner: productOwner._id })
        let profilePicOfseller = productOwner.profilePic ? productOwner.profilePic.toString('base64') : null;
        let productPic = product.image ? product.image.toString('base64') : null;
        const productListsWithImage = products.map((product) => {
            const imageProduct = product.image ? product.image.toString('base64') : null;
            return {
                ...product.toObject(),
                image: imageProduct
            };
        })
        res.json([
            {
                productListsWithImage
            },
            {
                _id: product._id,
                productName: product.productName,
                image: productPic,
                description: product.description,
                price: product.price,
                date: product.date,
                category: product.category
            },
            {
                _id: productOwner._id,
                number: productOwner.number,
                username: productOwner.username,
                email: productOwner.email,
                category: productOwner.category,
                profilePic: profilePicOfseller,
                date: productOwner.date,
                sellerPosts: productOwner.sellerPosts
            }
        ])
    } catch (error) {
        console.log(error)
    }
})


app.post('/order/:id', async (req, res) => {
    try {
        let { username, number, location, description } = req.body;
        let product = await sellerPostsModel.findOne({ _id: req.params.id });
        let productOrder = await newOrderModel.create({
            username,
            number,
            location,
            description,
            productId: product._id,
            sellerId: product.productOwner,
            productDetail: product
        })

        res.send(productOrder);
    } catch (error) {
        console.log(error)
    }
})

app.get('/searchitem/:query', async (req, res) => {
    // const query = String(req.query.query || '');
    // if (!query) {
    //     return res.status(400).json({ message: 'Search query cannot be empty' });
    // }
    let searchedQuery = req.params.query
    if (searchedQuery === '') {
        return;
    }
    try {
        let searchedProduct = await sellerPostsModel.find({
            $or: [
                { productName: { $regex: searchedQuery, $options: 'i' } },
                { description: { $regex: searchedQuery, $options: 'i' } },
                { category: { $regex: searchedQuery, $options: 'i' } },
                { price: { $regex: searchedQuery, $options: 'i' } },
            ]
        })
        const productListsWithImage = searchedProduct.map((product) => {
            const imageProduct = product.image ? product.image.toString('base64') : null;
            return {
                ...product.toObject(),
                image: imageProduct
            };
        })
        // console.log(productListsWithImage)
        res.json(productListsWithImage)
    } catch (error) {
        console.log(error)
    }
})

app.listen(8081, (req, res) => {
    console.log("Running");
})