import Jwt from "jsonwebtoken";
import "dotenv/config";
export const generateTokens = async (userId, role) => {
    const accessToken = Jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = Jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
