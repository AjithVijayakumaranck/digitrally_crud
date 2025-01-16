
const router = require('express').Router()
const controller = require('../Controllers/crud_controller')



router.post('/add_customer',controller.addCustomer)

router.delete('/delete_customer/:userId',controller.deleteCustomer)

router.get('/get_customers',controller.getCustomer)

router.put('/update_customer',controller.updateCustomer)






module.exports = router;