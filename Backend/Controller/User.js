const product = require('../Database/schema');
const client = require('../Database/logschema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const addBook = async (req, res) => {
    const { name, author } = req.body;
    // ,date,summary,category,language,pages,isbn}
  
    const productExist = await product.findOne({ name: name });
  
    if (productExist) {
      res.json({
        message: "Book already added to library",
        ifError: true,
      });
    } else {
      const productDetails = await product.create({
        name,
        author
       });
  
      res.json({
        id: productDetails.id,
        name: productDetails.name
        
      });
    }
  };

  const books = async (req, res) => {
    const allBooks = await product.find();
    res.json(allBooks);
  };

  const deleteproduct = async (req, res) => {
    const _id = req.params.id;
    const delproduct = await product.findByIdAndDelete(_id);
    res.json({ message: 'Book deleted successfully' });
};


  const updateProduct = async (req, res) => {
    const { name, author } = req.body;
  
    const _id = req.params.id;
  
    const up = await product.findByIdAndUpdate(_id, {
      name,
      author,
    });
    res.json(up);
  };


const display = async(req,res)=>{
  const _id = req.params._idid;
  const disp = await product.findById(_id)
  res.json(disp)
  }

  const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await client.findOne({ email });
  
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        res.json({ email: user.email, id: user.id, token: generateToken(user.id) });
      } else {
        res.json({
          message: "Invalid password",
          isError: true,
        });
      }
    } else {
      res.json({
        message: "User not found",
        isError: true,
      });
    }
  };
  
  const signup = async (req, res) => {
    const { name, email, password } = req.body;
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const userExist = await client.findOne({ email: email });
  
    if (userExist) {
      res.json({
        message: "Use another email",
        isError: true,
      });
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      
      const userDetails = await client.create({
        name,
        email,
        password: hashedPassword,
      });
  
    res.json({
        id: userDetails.id,
        email: userDetails.email,
        token: generateToken(userDetails.id),
      });
    }
  };
  const generateToken = (id) => {
    return jwt.sign({ id }, "1234", { expiresIn: "1d" });
  };
  


  module.exports = {addBook,books,deleteproduct,updateProduct,display,login,signup}