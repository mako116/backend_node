import express from 'express';
import { deleteLoan, getExpiredLoans, getLoans, getLoansByEmail, getLoansByStatus } from '../controllers/loanController.js';
import { protect } from '../middlewares/AuthMiddleWare.js';
// import {
//   getLoans,
//   getLoansByStatus,
//   getLoansByEmail,
//   getExpiredLoans,
//   deleteLoan
// } from '../controllers/loanController.js';
// import { protect } from '../middlewares/AuthMiddleWare.js';

const router = express.Router();

router.get('/', protect, getLoans);
router.get('/expired', protect, getExpiredLoans);
router.get('/:userEmail/get', protect, getLoansByEmail);
router.get('/', protect, getLoansByStatus);
router.delete('/:loanId/delete', protect, deleteLoan);

export default router;
