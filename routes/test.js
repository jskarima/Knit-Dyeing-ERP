const express = require('express');
const router = express.Router();
const Knit = require('../models/knit');
const Auth = require('../config/auth');

router.post('/knit', async (req, res) => {
    const { rfno, buyer, style, ycount, lotno, fabtype, sl, colour, reqgsm, aftgsm, mdia, fdia, knitcompany, productionqty, balanceqty, startdate, closedate,  note } = req.body;
    try {
        const knit = new Knit({ rfno, buyer, style, ycount, lotno, fabtype, sl, colour, reqgsm, aftgsm, mdia, fdia, knitcompany, productionqty, balanceqty, startdate, closedate,  note });
        await knit.save();res.redirect('/test/knit');
    } catch (error) {
        console.error(error);res.send('Data not Save');
    }
});

router.get('/knit', Auth.check(), async (req, res) => {
    try {
        const knits = await Knit.find();res.render('knit', { knits });
    } catch (error) {
        console.error(error);res.send('Production data not view please try again');
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        await Knit.findByIdAndDelete(req.params.id);res.redirect('/test/knit');
    } catch (error) {
        console.error(error);res.render('knit', {errorMessage: 'Delete not Compleated...'});
    }
});


router.get('/quality', Auth.check(), (req, res) => {
    res.render('quality');
});

module.exports = router;