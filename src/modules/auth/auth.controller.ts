import { Request, Response } from 'express'
import { registerUserService, getAllUsersService, getUserProfileService, loginUserService, updateUserService, logoutUserService, deleteUserService } from './auth.service.js'
import { errorResponse, successResponse } from '../../utils/response.js'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role } = req.body
        await registerUserService({ username, email, password, role })
        return successResponse(res, 201, 'User registered successfully')
    } catch (error) {
        return errorResponse(res, error, 409)
    }

}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        return successResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
        return errorResponse(res, error, 400)
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const user = await getUserProfileService(userId);
        return successResponse(res, 200, 'User profile retrieved successfully', user);
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const loginUser = await loginUserService({ email, password });
        return successResponse(res, 200, 'User logged in successfully', loginUser);
    } catch (error) {
        return errorResponse(res, error, 400)
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const { email, username, password } = req.body
        const authUser = req.user!

        if (authUser.id !== userId && authUser.role !== "ADMIN") {
            throw new Error('Unauthorized')
        }

        await updateUserService({ userId, email, username, password });
        return successResponse(res, 200, 'User updated successfully')
    } catch (error) {
        return errorResponse(res, error, 400)
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { refreshToken } = req.body
        await logoutUserService({ userId, refreshToken });
        return successResponse(res, 200, 'User logged out successfully')
    } catch (error) {
        return errorResponse(res, error, 400)
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const authUser = req.user!

        if (authUser.id !== userId && authUser.role !== "ADMIN") {
            throw new Error('Unauthorized');
        }

        await deleteUserService(userId);
        return successResponse(res, 200, 'User deleted successfully')
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const myProfile = async (req: Request, res: Response) => {
    try {
        const authuser = req.user!
        const me = await getUserProfileService(authuser.id)
        return successResponse(res, 200, "User retrieved successfully", me)
    } catch (error) {
        return errorResponse(res, error, 400)
    }

}
