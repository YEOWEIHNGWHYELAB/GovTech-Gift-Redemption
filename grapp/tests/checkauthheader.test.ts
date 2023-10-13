import { checkAuthHeader } from '../auth/jwtmanager';

describe('checkAuthHeader', () => {
    it('should return the second part of the auth header if it exists', () => {
        const authHeader = 'Bearer yourAuthToken';

        // Create a mock Response object to test the response
        const mockResponse: any = {
        json: jest.fn(),
        };

        const result = checkAuthHeader(authHeader, mockResponse);

        expect(result).toBe('yourAuthToken');
        expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should return an error message when the auth header is missing', () => {
        const authHeader = 'Bearer';

        const mockResponse: any = {
        json: jest.fn(),
        };

        const result = checkAuthHeader(authHeader, mockResponse);
        expect(result).toBe(undefined);
        expect(mockResponse.json).toHaveBeenCalledWith('Authorization header missing');
    });
});