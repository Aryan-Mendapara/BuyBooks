import mongooes from "mongoose";

const accountSchema = new mongooes.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'], 
        required: true       
    }
})

const Account = mongooes.model("Account", accountSchema);

export default Account;