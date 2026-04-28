import Jwt from "jsonwebtoken"
import "dotenv/config";

export const generateTokens = async (userId: string, role: string) => {
    const accessToken = Jwt.sign(
        { id: userId, role: role },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
    );

    const refreshToken = Jwt.sign(
        { id: userId },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
}