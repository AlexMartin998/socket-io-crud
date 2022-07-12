'use strict';

import express from 'express';

import './db/db';
import { setupMiddlewares } from './middlewares/setup.middleware';

// Initializations:
const app = express();

// Middlewares
setupMiddlewares(app);

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'GET' });
});

export default app;
