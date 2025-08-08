import express from 'express';
import { addVariant } from '../controllers/variant';

const router = express.Router();

// Routes
router.post('/create',                  addVariant);

export default router;