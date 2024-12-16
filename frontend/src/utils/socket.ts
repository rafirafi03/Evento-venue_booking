import { io } from 'socket.io-client';
import { baseUrl } from 'app/constants/api';

// Connect to the API Gateway
const socket = io(baseUrl, {
  path: '/api/chats/socket.io',
});

export default socket;
