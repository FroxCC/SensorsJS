const router = require('express').Router();
const {viewMain, viewTables, viewNotifications, viewMapGiant} = require('../../controllers/PageControllers')

// router.get('/',(req,res) =>{
//     res.render('layout');
// })

router.get('/', viewMain)
router.get('/tables', viewTables)
router.get('/notifications', viewNotifications)
router.get('/index', viewMapGiant)

module.exports = router;