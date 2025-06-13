import axios from 'axios';

const LoginUser = async ({body}) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/login/post`,
      body
    );
    console.log(response);
    return response.data;
    
  } catch (error) {
    console.log("Login API error:",error);  
    throw error;
  }
}

export default LoginUser