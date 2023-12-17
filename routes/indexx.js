var express = require('express');
var router = express.Router();
const multer  = require('multer');
const Contact = require('../models/contacts');
const Mouse = require('../models/mouse');
const SaleRecord = require('../models/saleRecord');
const User = require('../models/user');


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', async (req, res) => {
  try {
    const users = User.find();res.render('login', { users });
  } catch (error) {
    console.error(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

// Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Create a new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});










// সব মাউস দেখানোর জন্য একটি রাউট
router.get('/addmouse', async (req, res) => {
  try {
    const dbmouse = await Mouse.find();res.render('addmouse', { dbmouse });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// একটি মাউস যোগ করতে একটি রাউট
router.post('/addmouse', async (req, res) => {
  const { serialNumber, name, color, weight, quantity, price } = req.body;
  try {
    const newMouse = new Mouse({ serialNumber, name, color, weight, quantity, price });
    await newMouse.save();res.redirect('/addmouse');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
router.get('/mouse-details', async (req, res) => {
  res.render('mouse-details')
});


// Route to find details based on Serial Number
router.post('/mouse-details', async (req, res) => {
  const { serialNumber } = req.body;

  try {
    // Find details based on Serial Number
    const mouseDetails = await Mouse.findOne({ serialNumber });

    if (!mouseDetails) {
      return res.render('mouse-details', { error: 'Mouse not found' });
    }

    res.render('mouse-details', { mouseDetails, serialNumber });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// ------------------------------------------------------------------------------------------



// Handle POST request to sell mouse
router.post('/mice/sell', async (req, res) => {
  try {
    const { serialNumber, quantity, customerName, customerMobile, customerAddress } = req.body;

    // Find the mouse in the database based on serialNumber
    const mouseDetails = await Mouse.findOne({ serialNumber });

    if (!mouseDetails) {
      return res.render('mouse-details', { error: 'No mouse details found' });
    }

    // Check if there's enough quantity to sell
    if (quantity > mouseDetails.quantity) {
      return res.render('mouse-details', { error: 'Not enough quantity to sell' });
    }

    // Update the quantity and save the mouse details
    mouseDetails.quantity -= quantity;
    await mouseDetails.save();

    // Create a new SaleRecord with customer details
    const saleRecord = new SaleRecord({
      serialNumber,
      soldQuantity: quantity,
      customerName,
      customerMobile,
      customerAddress,
    });

    // Save the SaleRecord
    await saleRecord.save();

    // Render the updated mouse details page
    return res.render('mouse-details', { mouseDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).render('error', { error: 'Internal Server Error' });
  }
});

// সব SaleRecord ডেটা দেখানোর জন্য একটি রাউট
router.get('/sale-records', async (req, res) => {
  try {
    // ডাটাবেস থেকে sale records ধরা
    const saleRecords = await SaleRecord.find();
    // sale-records.pug টেমপ্লেট ফাইলকে রেন্ডার করে ব্রাউজারে দেখানো
    res.render('records', { saleRecords });
  } catch (err) {
    console.error(err);res.status(500).send('Server Error');
  }
});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    cb(null, originalname)
  }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.post('/contact', upload.single('image'), async (req, res, next) => {
  const { name, image } = req.body;
  try {
    const contact = new Contact({ name, image: req.file.filename });
    await contact.save();res.render('contact', {successMessage: 'Data Save Successfully'});
  } catch (error) {
    console.error(error);res.render('contact', {errorMessage: 'Name and image are required fields.'});
  }
});

router.get('/contacts', async (req, res, next) => {
  try {
      const contacts = await Contact.find();res.render('contacts', {contacts });
  } catch (error) {
    console.error(error);res.render('contacts', {errorMessage: 'contact not found' });
  }
});


router.get('/delete/:id', async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);res.redirect('/contacts');
  } catch (error) {
    console.error(error);res.render('contacts', { errorMessage: 'Failed to delete contact' });
  }
});


module.exports = router;
