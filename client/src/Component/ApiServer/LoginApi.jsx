import axios from 'axios';

export const LoginUser = async ({ body }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/login/post`,
      body
    );
    console.log(response);
    return response.data;

  } catch (error) {
    console.log("Login API error:", error);
    throw error;
  }
}

export const LoginDelete = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/books/login/delete/${id}`
    );

    console.log("Login Delete Response:", response);
    return response.data;  
  } catch (error) {
    console.log("Login Delete API error:", error);
    throw error;    
  }
}

export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/login/verify-otp`,
      { email, otp }
    );
    console.log("OTP Verify Response:", response);
    return response.data;
  } catch (error) {
    console.log("OTP Verify API error:", error.response?.data || error.message);
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
