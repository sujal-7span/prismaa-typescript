import { userService } from './auth.service.js';
export const registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        console.log(user);
        return res
            .status(201)
            .json({ message: 'User registered successfully', data: user });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(409)
                .json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const loginUser = async (req, res) => {
    try {
        const loginUser = await userService.loginUser(req.body);
        return res
            .status(200)
            .json({ message: 'User logged in successfully', data: loginUser });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const updateUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = req.params.id;
        await userService.updateUser(req.user, userId, req.body);
        return res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
