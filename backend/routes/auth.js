// routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

    const exists = db.prepare('SELECT 1 FROM users WHERE email=?').get(email);
    if (exists) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const id = uuid();
    db.prepare(`INSERT INTO users(id,name,email,password_hash,created_at) VALUES(?,?,?,?,datetime('now'))`)
      .run(id, name, email, hash);

    // Sign-in immediately after signup
    req.session.user = { id, name, email };
    res.json({ message: 'Signup successful', user: req.session.user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = db.prepare('SELECT * FROM users WHERE email=?').get(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.json({ message: 'Login successful', user: req.session.user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.json({ message: 'Logged out' });
});

router.get('/me', (req, res) => {
  res.json({ user: req.session?.user ?? null });
});

export default router;
