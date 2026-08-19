import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// নতুন অর্ডার পাঠানোর API কল
export const createOrderAPI = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/create`, orderData);
    return response.data;
  } catch (error) {
    console.error("Order Creation Error:", error);
    throw error;
  }
};

// বাকির তালিকা (Due List) নিয়ে আসার API
export const getDuesAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/dues`);
    return response.data;
  } catch (error) {
    console.error("Fetch Dues Error:", error);
    throw error;
  }
};