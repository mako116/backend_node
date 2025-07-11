import { readStaff } from "../utils/fileUtils.js";
import { generateToken } from "../utils/jwtUtlis.js";

 
export const login = async (req, res) => {
  const { email, password } = req.body;
  const staffList = await readStaff();

  const user = staffList.find(user => user.email === email && user.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token, user });
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};
