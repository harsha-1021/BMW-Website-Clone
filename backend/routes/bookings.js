// routes/bookings.js
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

const router = Router();

// Require auth middleware
function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ error: 'Login required' });
  next();
}

router.post('/', requireAuth, (req, res) => {
  const { model, preferred_date, location } = req.body ?? {};
  if (!model || !preferred_date) return res.status(400).json({ error: 'model and preferred_date required' });

  const id = uuid();
  db.prepare(`
    INSERT INTO bookings(id,user_id,model,preferred_date,location,created_at)
    VALUES(?,?,?,?,?,datetime('now'))
  `).run(id, req.session.user.id, model, preferred_date, location ?? null);

  res.json({ message: 'Booking created', id });
});

router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare(`SELECT * FROM bookings WHERE user_id=? ORDER BY created_at DESC`).all(req.session.user.id);
  res.json({ bookings: rows });
});

export default router;
