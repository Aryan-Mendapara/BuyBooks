import axios from 'axios';


export const loginUser = async (email, mobileno) => {
  try {
    const res = await axios.post(
      "https://buybooks-server.onrender.com/books/login/loginuser",
      { email, mobileno }, // body
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("✅ Login Success:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Login API error:", err.response ? err.response.data : err.message);
  }
};

export const LoginGet = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/books/login/getlogin`
    );
    // console.log("Login Get Response:", response);
    return response.data;
  }
  catch (error) {
    console.log("Login Get API error:", error);
    throw error;
  }
}

// export const LoginUser = async (body) => { 
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/books/login/post`,
//       body // ✅ directly pass body, not { body }
//     );
//     console.log("Login API response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Login API error:", error);
//     throw error;
//   }
// };


export const LoginDelete = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/books/login/delete/${id}`
    );

    // console.log("Login Delete Response:", response);
    return response.data;
  } catch (error) {
    console.log("Login Delete API error:", error);
    throw error;
  }
}

// export const verifyOtp = async ({ email, otp }) => {
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/books/login/verify-otp`,
//       { email, otp }
//     );
//     console.log("OTP Verify Response:", response);
//     return response.data;
//   } catch (error) {
//     console.log("OTP Verify API error:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/login/verify-otp`,
      { email, otp },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error.response?.data || error.message);
    throw error;
  }
};



// export const generateOtp = async (email) => {
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/books/login/generate-otp`,
//       { email }
//     );
//     console.log("OTP Generate Response:", response);
//     return response.data;
//   } catch (error) {
//     console.log("OTP Generate Api error:", error.response?.data || error.message);
//     throw error;
//   }
// };
