import fs from 'fs/promises';
import path from 'path';

export const readLoans = async () => {
  const data = await fs.readFile(path.resolve('../data/loans.json'), 'utf-8');
  return JSON.parse(data);
};

export const readStaff = async () => {
  const data = await fs.readFile(path.resolve('../data/staffs.json'), 'utf-8');
  return JSON.parse(data);
};
