import express from 'express';
import { body, validationResult } from 'express-validator';
import Advertisement from '../models/Advertisement.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all active ads (public)
router.get('/', async (req, res) => {
  try {
    const ads = await Advertisement.find({ isActive: true }).sort({ order: 1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes
router.use(authenticate, adminOnly);

// Get all ads for admin
router.get('/admin/all', async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create advertisement
router.post('/', [
  body('title').trim().isLength({ min: 2 }).withMessage('Title is required'),
  body('image.url').isURL().withMessage('Valid image URL is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ad = new Advertisement(req.body);
    await ad.save();

    res.status(201).json({ message: 'Advertisement created successfully', ad });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update advertisement
router.put('/:id', async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.json({ message: 'Advertisement updated successfully', ad });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete advertisement
router.delete('/:id', async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    res.json({ message: 'Advertisement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle advertisement status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    ad.isActive = !ad.isActive;
    await ad.save();

    res.json({ message: 'Advertisement status updated', ad });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;