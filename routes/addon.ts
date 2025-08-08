import express from 'express';
import { addAddon } from '../controllers/addon';

const router = express.Router();

// Routes
router.post('/create',                  addAddon);

export default router;