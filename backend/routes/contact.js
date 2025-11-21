import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

const router = Router();

router.post('/', (req, res) => {
  const { name, phone, whatsapp, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const id = uuid();
  db.prepare(`
    INSERT INTO contacts (id, name, phone, whatsapp, email, message, created_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(id, name, phone ?? '', whatsapp ?? '', email, message);

  res.json({ message: 'Message received successfully!' });
});

export default router;
