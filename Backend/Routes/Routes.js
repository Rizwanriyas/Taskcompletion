const express = require('express');
const {addBook,books,deleteproduct,updateProduct,display,login, signup} = require('../Controller/User');
const router = express.Router();

router.route('/create').post(addBook)
router.route('/product').get(books)
router.route('/delete/:id').delete(deleteproduct)
router.route('/update/:id').put(updateProduct)
router.route('/display/:id').get(display)
router.route('/login').post(login)
router.route('/signup').post(signup)




module.exports = router