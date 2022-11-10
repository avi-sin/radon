const router = require('express').Router();
const controller = require('./studentController');

router.post('/createAdmin', controller.createAdmin);
router.post('/login', controller.loginAdmin);
router.get('/students/:adminId', controller.getStudents);
router.put('/update/:adminId', controller.auth, controller.updateStudent);
router.delete('/delete/:adminId', controller.auth, controller.deleteStudent);

router.all("/**", function (req, res) {
    return res.status(400).send({ status: false, message: "invalid URL" });
})

module.exports = router;