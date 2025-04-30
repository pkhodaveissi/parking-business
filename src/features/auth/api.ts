import axios from '@/api/axios';

export async function loginUser(email: string, password: string): Promise<string> {
  const res = await axios.post('/auth/password', { email, password });
  return res.data.data.auth.accessToken;
}
export const getCurrentUser = async () => {
  const res = await axios.get('/auth/me');
  return res.data.data.user;
};