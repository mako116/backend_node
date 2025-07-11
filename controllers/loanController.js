// import { readLoans } from '../utils/fileUtils.js';
import moment from 'moment';
import { readLoans } from '../utils/fileUtils.js';

export const getLoans = async (req, res) => {
  const { role } = req.user;
  const loans = await readLoans();

  const result = loans.map(loan => {
    const filteredLoan = { ...loan };
    if (role === 'staff') {
      delete filteredLoan.applicant.totalLoan;
    }
    return filteredLoan;
  });

  res.json(result);
};

export const getLoansByStatus = async (req, res) => {
  const { role } = req.user;
  const { status } = req.query;
  const loans = await readLoans();

  const filtered = loans.filter(loan => loan.status === status);
  const result = filtered.map(loan => {
    if (role === 'staff') delete loan.applicant.totalLoan;
    return loan;
  });

  res.json(result);
};

export const getLoansByEmail = async (req, res) => {
  const { userEmail } = req.params;
  const loans = await readLoans();
  const userLoans = loans.filter(loan => loan.applicant.email === userEmail);
  res.json({ loans: userLoans || [] });
};

export const getExpiredLoans = async (req, res) => {
  const loans = await readLoans();
  const today = moment();
  const expired = loans.filter(loan => moment(loan.maturityDate).isBefore(today));
  res.json(expired);
};

export const deleteLoan = async (req, res) => {
  if (req.user.role !== 'superAdmin') return res.status(403).json({ message: 'Forbidden' });

  const { loanId } = req.params;
  let loans = await readLoans();
  const originalLength = loans.length;

  loans = loans.filter(loan => loan.id !== loanId);

  if (loans.length === originalLength) {
    return res.status(404).json({ message: 'Loan not found' });
  }

  res.json({ message: 'Loan deleted successfully' });
};
