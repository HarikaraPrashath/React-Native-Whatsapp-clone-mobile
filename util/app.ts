import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.8.181:5000/api";

export const fetchUser = async (phoneNumber) => {
    try {
        const response = await axios.get(`${API_URL}/users/${phoneNumber}`);
        return response.data
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}


export const updateUser = async (id,formData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    }
    catch (error) {
        console.log("Update user failed",error)
    }
}


export const createUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    }
    catch (error) {
        console.log("Save user failed",error)
    }
}