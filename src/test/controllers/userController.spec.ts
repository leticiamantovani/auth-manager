import { Request, Response } from 'express';
import { UserController } from '../../controllers/userController';
import { UserService } from '../../services/userService';

describe('UserController', () => {
    let userService: jest.Mocked<UserService>;
    let userController: UserController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let sendMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        userService = {
            loginValidation: jest.fn(),
            registerUser: jest.fn(),
        } as unknown as jest.Mocked<UserService>;

        userController = new UserController(userService);

        sendMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ send: sendMock });

        mockRequest = {
            body: {},
        };

        mockResponse = {
            status: statusMock,
        };
    });

    it('should return 200 and a success message when login is valid', async () => {
        mockRequest.body = { username: 'testuser', password: 'password123' };

        userService.loginValidation.mockResolvedValue({ status: 200, message: 'Login successful' });

        await userController.loginHandler(mockRequest as Request, mockResponse as Response);

        expect(userService.loginValidation).toHaveBeenCalledWith('testuser', 'password123');
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith('Login successful');
    });

    it('should return 500 if login throws an error', async () => {
        mockRequest.body = { username: 'testuser', password: 'password123' };

        userService.loginValidation.mockRejectedValue(new Error('Internal Server Error'));

        await userController.loginHandler(mockRequest as Request, mockResponse as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return 201 and a token on successful registration', async () => {
        mockRequest.body = { username: 'newuser', password: 'pass123' };

        userService.registerUser.mockResolvedValue({ status: 201, message: 'User created', token: 'mocked-token' });

        await userController.registerHandler(mockRequest as Request, mockResponse as Response);

        expect(userService.registerUser).toHaveBeenCalledWith('newuser', 'pass123');
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(sendMock).toHaveBeenCalledWith({ message: 'User created', token: 'mocked-token' });
    });

    it('should return 500 if register throws an error', async () => {
        mockRequest.body = { username: 'newuser', password: 'pass123' };

        userService.registerUser.mockRejectedValue(new Error('Database error'));

        await userController.registerHandler(mockRequest as Request, mockResponse as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith(expect.any(Error));
    });
});
