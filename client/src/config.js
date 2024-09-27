const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-production-backend-url.com'
  : 'http://localhost:5000';

export default BASE_URL;