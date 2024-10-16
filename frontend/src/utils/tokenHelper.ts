import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = () => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('authToken');

  if (token) {
    try {
      // Decode the token to get the payload
      const decodedToken = jwtDecode<{ userId: string }>(token);

      // Extract and return the userId
      return decodedToken.userId;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  } else {
    console.error('No token found in localStorage');
    return null;
  }
};

const userId = getUserIdFromToken();
console.log('User ID:', userId);
