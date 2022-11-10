const {studentModel, adminModel} = require('./models');
const bcrypt = require('bcrypt');
const validator = require("email-validator");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const createAdmin = async (req, res) => {
    try {
        let data = req.body;
        let {email, password} = data;
        if (!email || !password) return res.status(400).send({ status: false, message: `${email ? "" : "email"} ${password ? "" : "password"} => Mandatory field(s)`});

        let isValidEmail = validator.validate(email);
        if (!isValidEmail) return res.status(400).send({ status: false, message: "Enter a valid email."});

        let getEmail = await adminModel.findOne({ email, isDeleted: false });
        if (getEmail) return res.status(400).send({ status: false, message: "email already in use." });

        let salt = await bcrypt.genSalt(10);
        let hashedPass = await bcrypt.hash(password, salt);
        data.password = hashedPass;
        data.isDeleted = false;

        const adminCreated = await adminModel.create(data);
        return res.status(201).send({ status: true, message: "admin created successfully", data: adminCreated });
    } catch(err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const loginAdmin = async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        if (!email || !password) return res.status(400).send({ status: false, message: "Provide the email and password to login." });

        let isValidEmail = validator.validate(email);
        if (!isValidEmail) return res.status(400).send({ status: false, message: "Enter a valid email."});

        let admin = await adminModel.findOne({ email, isDeleted: false });
        if (!admin) return res.status(401).send({ status: false, message: "Email or password is incorrect." });

        let value = await bcrypt.compare(password.toString(), admin.password);
        if (!value) return res.status(401).send({ status: false, message: "Email or password is incorrect." });

        let token = jwt.sign(  // --> to generate the jwt token
            {
                adminId: admin._id.toString(),                          // --> payload
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),     // --> expiry set for 2 hours
                iat: Math.floor(Date.now() / 1000)
            },
            "avinash-secret-key"                                        // --> secret key
        )

        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, message: 'Admin login successful', data: { adminId: admin._id, token } });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const getStudents = async (req, res) => {
    try {
        let adminId = req.params.adminId;
        if (!adminId || !mongoose.isValidObjectId(adminId)) return res.status(400).send({ status: false, message: "Provide a valid adminId." });

        let admin = await adminModel.findOne({ _id: adminId, isDeleted: false });
        if (!admin) return res.status(404).send({ status: false, message: "adminId doesn't exist." });

        let students = await studentModel.find({ adminId, isDeleted: false }).select({ name: 1, subject: 1, marks: 1 });
        if (!students.length) return res.status(404).send({ status: false, message: "No student found." });

        return res.status(200).send({ status: true, data: students });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const verify = token => {
    return jwt.verify(token, 'avinash-secret-key', (err, decode) => {
        if (err) return null;
        return decode;
    })
}

const auth = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key'];
        if (!token) return res.status(401).send({ status: false, msg: "token must be present in request header."});
        let adminId = req.params.adminId;
        if (!adminId || !mongoose.isValidObjectId(adminId)) return res.status(400).send({ status: false, message: "Provide a valid adminId." });
        
        let decodedToken = verify(token);
        if (!decodedToken) return res.status(403).send({ status: false, message: "invalid token" });
        if (adminId !== decodedToken.adminId) return res.status(403).send({ status: false, message: "Authorization failed: adminId doesn't match with that in token."});
        next();
    } catch(err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        let data = req.body;
        let {name, subject, marks} = data;
        if (!name || !subject || !marks) return res.status(400).send({ status: false, message: "Provide name, subject, marks (mandatory fields) in request body." });

        let updatedStudentRecord = await studentModel.findOneAndUpdate(
            { adminId: req.params.adminId, name, subject },
            { $inc: {marks} },
            { new: true }
        ).select({_id: 0, name: 1, subject: 1, marks: 1 });
        if (updatedStudentRecord) return res.status(200).send({ status: true, message: "data updated", data: updatedStudentRecord });
        
        data.adminId = req.params.adminId;
        let studentRecordCreated = await studentModel.create(data);
        const created = { name: studentRecordCreated.name, subject: studentRecordCreated.subject, marks: studentRecordCreated.marks };
        return res.status(201).send({ status: true, message: "data created", data: created });
    } catch(err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
        let data = req.body;
        let {name, subject} = data;
        if (!name || !subject) return res.status(400).send({ status: false, message: "name and subject are mandatory fields." });
        data.adminId = req.params.adminId;
        data.isDeleted = false;

        let deleted = await studentModel.findOneAndUpdate(
            data,
            { isDeleted: true });
        if (!deleted) return res.status(400).send({ status: false, message: "No student record found to delete." });
        return res.status(204).send();
    } catch(err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = {createAdmin, loginAdmin, getStudents, auth, updateStudent, deleteStudent};