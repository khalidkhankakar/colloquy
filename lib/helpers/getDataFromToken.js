'use server'
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export const getDataFromToken = async () => {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const decodedToken = jwt.verify(token.value, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        console.log(error);
    }
}
