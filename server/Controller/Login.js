const Login = require("../Models/Login");

const addLogin = async (req, res) => {
    try {
        const { mobileno } = req.body
        console.log(">>>>>>>", req.body);

        if (!/^\d{10}$/.test(mobileno)) {
            return res.status(400).json({ message: "Please enter valid mobile number" });
        }

        const existLogin = await Login.findOne({ mobileno });
        if (existLogin) {
            return res.status(400).json({ message: "Login Already Exists" })
        }

        const login = new Login({
            mobileno,
        })
        await login.save()
        res.status(201).json({ message: "Login Added Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
}

const getLogin = async (req, res) => {
    try {
        const login = await Login.find();
        res.status(200).json({message: "Login retrieved successfully", login})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);        
    }
}

const updateLogin = async (req, res) => {
    try {
        const login = await Login.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!login)
            return res.status(404).json({ message: "User Not Found" });
        res.status(200).json({message: "Login updated successfully", login});        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);
    }
}

const deleteLogin = async (req, res) => {
    try {
        const login = await Login.findByIdAndDelete(req.params.id);
        if (!login)
            return res.status(404).json({ message: "User Not Found" });
        res.status(200).json({message: "Login deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);
    }
}

module.exports = { addLogin, getLogin, updateLogin, deleteLogin };