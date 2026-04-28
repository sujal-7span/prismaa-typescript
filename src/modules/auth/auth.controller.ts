import { Request, Response } from 'express'
import { userService } from './auth.service.js'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.registerUser(req.body)
        console.log(user)

        return res
            .status(201)
            .json({ message: 'User registered successfully', data: user })

    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(409)
                .json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }

}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();

        return res
            .status(200)
            .json({ message: 'Users retrieved successfully', data: users });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400)
                .json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const user = await userService.getUserProfile(userId);

        return res
            .status(200)
            .json({ message: 'User profile retrieved successfully', data: user });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const loginUser = await userService.loginUser(req.body);

        return res
            .status(200)
            .json({ message: 'User logged in successfully', data: loginUser });

    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        await userService.updateUser(req.user!, userId, req.body);

        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        await userService.logoutUser(userId, req.body);
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;

        await userService.deleteUser(req.user!, userId);
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
}
