import express from 'express';
import logger from '../logger.js';
import Log from '../models/Log.js';

const router = express.Router();

// POST /log
router.post('/', async (req, res) => {
  const { type, message, meta } = req.body;
  try {
    const log = new Log({ type, message, meta });
    await log.save();
    logger.info('Log saved:', log);
    res.status(201).send(log);
  } catch (error) {
    logger.error('Error saving log:', error);
    res.status(500).send({ error: 'Failed to save log' });
  }
});

// GET /logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.send(logs);
  } catch (error) {
    logger.error('Error fetching logs:', error);
    res.status(500).send({ error: 'Failed to fetch logs' });
  }
});

export default router;