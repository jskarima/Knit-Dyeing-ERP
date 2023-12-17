var express = require('express');
var router = express.Router();
const multer = require('multer');
const Chat = require('../models/chat');
const User = require('../models/user');
const Sample = require('../models/sample');
const Order = require('../models/booking');
const passport = require('passport');
const Auth = require('../config/auth');


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

router.post('/chat', upload.single('image'), async (req, res, next) => {
    const { ref, message, image } = req.body;
    try {
        const chat = new Chat({ ref, message, image: req.file.filename });
        await chat.save();res.redirect('/chat')
    } catch (error) {
        console.error(error);res.send('Live Post & Solution not Save...');
    }
});

router.get('/chat', Auth.check(), async (req, res) => {
    try {
        const chats = await Chat.find();res.render('chat', { chats });
    } catch (error) {
        console.error(error);res.send('Live Post & Solution not View Please Refresh try again');
    }
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res, next) {
    res.redirect('/dashboard');
});

router.get('/dashboard', Auth.check(), (req, res, next) => {
    res.render('dashboard',{title: 'Dashoboard', user:req.user});
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('signup', { errorMessage: 'Failed to register user' });
    }
});

router.post('/sample', async (req, res) => {
    const { job, buyer, style, ycount, lotno, fabtype, sl, colour, reqgsm, aftgsm, mdia, fdia, knitcompany, knitclodate, actuclodate, note } = req.body;
    try {
        const sample = new Sample({ job, buyer, style, ycount, lotno, fabtype, sl, colour, reqgsm, aftgsm, mdia, fdia, knitcompany, knitclodate, actuclodate, note });
        await sample.save();res.redirect('/sample');
    } catch (error) {
        console.error(error);res.send('Data not Save Successfull');
    }
});

router.get('/sample', Auth.check(), async (req, res) => {
    try {
        const samples = await Sample.find();res.render('sample', { samples });
    } catch (error) {
        console.error(error);res.send('Data not view');
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        await Sample.findByIdAndDelete(req.params.id);res.redirect('/sample');
    } catch (error) {
        console.error(error);res.render('sample', {errorMessage: 'delete not successfull'});
    }
});

router.get('/order', Auth.check(), (req, res) => {
    res.render('booking');
});

router.post('/order', async (req, res) => {
    const { buy, or, rf, session, ycount, yqty, lotno, ftype, sl, gsm, color, mdia, fdia } = req.body;
    try {
        const order = new Order({ buy, or, rf, session, ycount, yqty, lotno, ftype, sl, gsm, color, mdia, fdia });
        await order.save();res.redirect('/booking');
    } catch (error) {
        console.error(error);res.send('Booking not Save Please use the Refresh then try again');
    }
});

module.exports = router;




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/uploads')
//     },
//     filename: function (req, file, cb) {
//       const originalname = file.originalname;
//       cb(null, originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage });

//   router.post('/profile', upload.single('image'), async (req, res, next) => {
//     const { name,image } = req.body;
//     try {
//         const profile = new User({ name,image: req.file.filename });
//         await profile.save();res.render('profile')
//     } catch (error) {
//         console.error(error);
//     }
// });

// router.get('/login', (req, res) => {
//     res.render('login');
// });

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

// router.get('/register', (req, res) => {
//     res.render('register');
// });

// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = new User({ username, password });
//         await user.save();
//         res.redirect('/login');
//     } catch (error) {
//         console.error(error);
//         res.render('register', { errorMessage: 'Failed to register user' });
//     }
// });

// router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/login');
// });


// // ES6 সিনট্যাক্স ব্যবহার করে isAuthenticated একটি মিডলওয়্যার ফাংশন তৈরি করুন
// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };
// // ...

// router.get('/profile', isAuthenticated, (req, res) => {
//     res.render('profile');
// });


// module.exports = router;

// isAuthenticated একটি সংক্ষেপিত ফাংশন তৈরি করুন
// const isAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');
// router.get('/profile', isAuthenticated, (req, res) => res.render('profile'));

