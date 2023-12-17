var express = require('express');
var router = express.Router();


// GET request to render inventory page
router.get('/houseRant', async (req, res) =>  {
    res.render('houseRant')
})



module.exports = router;
