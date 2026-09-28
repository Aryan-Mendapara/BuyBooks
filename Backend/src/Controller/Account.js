import Account from "../Models/Account.js";

const addAccount = async (req, res) => {
    try {
        const { firstName, lastName, mobileno, email, gender } = req.body;
        console.log("Received Account Data:", req.body);

        if (!firstName || !lastName || !mobileno || !email || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!/^[6-9]\d{9}$/.test(String(mobileno))) {
            return res.status(400).json({ message: "Enter a valid 10-digit mobile number starting with 6-9" });
        }
        
        const newAccount = new Account({
            firstName,
            lastName,
            mobileno,
            email,
            gender
        });

        await newAccount.save();

        console.log("Account created successfully:", newAccount);
        return res.status(201).json({ message: "Account created successfully" });        
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });        
    }
}

const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ message: "Account deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error("Delete Account Error:", error);
    }
}

export { addAccount, deleteAccount };