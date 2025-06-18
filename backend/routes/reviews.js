// import express from 'express';
// import { body, validationResult } from 'express-validator';
// import Review from '../models/Review.js';
// import Product from '../models/Product.js';
// import Order from '../models/Order.js';
// import { authenticate, adminOnly } from '../middleware/auth.js';

// const router = express.Router();

// // Get reviews for a product (public)
// router.get('/product/:productId', async (req, res) => {
//   try {
//     const reviews = await Review.find({ 
//       product: req.params.productId, 
//       isApproved: true 
//     })
//     .populate('customer', 'name')
//     .sort({ createdAt: -1 });

//     res.json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Create review (authenticated customer)
// router.post('/', authenticate, [
//   body('product').isMongoId().withMessage('Valid product ID is required'),
//   body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
//   body('comment').trim().isLength({ min: 5 }).withMessage('Comment must be at least 5 characters')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { product, rating, comment } = req.body;

//     // Check if customer has purchased this product
//     const order = await Order.findOne({
//       customer: req.user._id,
//       'items.product': product,
//       orderStatus: 'Delivered'
//     });

//     if (!order) {
//       return res.status(400).json({ message: 'You can only review products you have purchased and received' });
//     }

//     // Check if review already exists
//     const existingReview = await Review.findOne({
//       product,
//       customer: req.user._id
//     });

//     if (existingReview) {
//       return res.status(400).json({ message: 'You have already reviewed this product' });
//     }

//     const review = new Review({
//       product,
//       customer: req.user._id,
//       rating,
//       comment
//     });

//     await review.save();
//     await review.populate('customer', 'name');

//     // Update product rating
//     await updateProductRating(product);

//     res.status(201).json({ message: 'Review submitted successfully', review });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Admin routes
// router.use(adminOnly);

// // Get all reviews for admin
// router.get('/admin/all', async (req, res) => {
//   try {
//     const reviews = await Review.find()
//       .populate('customer', 'name email')
//       .populate('product', 'name')
//       .sort({ createdAt: -1 });

//     res.json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Approve/reject review
// router.patch('/:id/approve', async (req, res) => {
//   try {
//     const { isApproved } = req.body;
//     const review = await Review.findByIdAndUpdate(
//       req.params.id,
//       { isApproved },
//       { new: true }
//     ).populate('customer', 'name').populate('product', 'name');

//     if (!review) {
//       return res.status(404).json({ message: 'Review not found' });
//     }

//     // Update product rating
//     await updateProductRating(review.product._id);

//     res.json({ message: 'Review status updated', review });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Delete review
// router.delete('/:id', async (req, res) => {
//   try {
//     const review = await Review.findByIdAndDelete(req.params.id);
//     if (!review) {
//       return res.status(404).json({ message: 'Review not found' });
//     }

//     // Update product rating
//     await updateProductRating(review.product);

//     res.json({ message: 'Review deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Helper function to update product rating
// async function updateProductRating(productId) {
//   const reviews = await Review.find({ product: productId, isApproved: true });
//   const totalReviews = reviews.length;
//   const averageRating = totalReviews > 0 
//     ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
//     : 0;

//   await Product.findByIdAndUpdate(productId, {
//     averageRating: Math.round(averageRating * 10) / 10,
//     totalReviews
//   });
// }

// export default router;


import express from 'express';
import { body, validationResult } from 'express-validator';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

/* ----------------------------------
   PUBLIC ROUTES
---------------------------------- */

// ✅ Get all approved reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true
    })
      .populate('customer', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ----------------------------------
   AUTHENTICATED CUSTOMER ROUTES
---------------------------------- */

// ✅ Create a new review (only after purchase)
router.post('/', authenticate, [
  body('product').isMongoId().withMessage('Valid product ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().isLength({ min: 5 }).withMessage('Comment must be at least 5 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { product, rating, comment } = req.body;

    // ✅ Check if user bought & received the product
    const order = await Order.findOne({
      customer: req.user._id,
      'items.product': product,
      orderStatus: 'Delivered'
    });

    if (!order) {
      return res.status(400).json({ message: 'You can only review products you have purchased and received' });
    }

    // ✅ Check for existing review
    const alreadyReviewed = await Review.findOne({
      product,
      customer: req.user._id
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = new Review({
      product,
      customer: req.user._id,
      rating,
      comment
    });

    await review.save();
    await review.populate('customer', 'name');

    await updateProductRating(product);

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ----------------------------------
   ADMIN ROUTES (protected)
---------------------------------- */

// ✅ Apply both auth and role protection
router.use(authenticate, adminOnly);

// ✅ Get all reviews (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('customer', 'name email')
      .populate('product', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Approve or reject a review
router.patch('/:id/approve', async (req, res) => {
  try {
    const { isApproved } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    ).populate('customer', 'name')
     .populate('product', 'name');

    if (!review) return res.status(404).json({ message: 'Review not found' });

    await updateProductRating(review.product._id);

    res.json({ message: 'Review status updated', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    await updateProductRating(review.product);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ----------------------------------
   HELPER FUNCTION
---------------------------------- */

// ✅ Recalculate average rating and total reviews
async function updateProductRating(productId) {
  const reviews = await Review.find({ product: productId, isApproved: true });

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  await Product.findByIdAndUpdate(productId, {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews
  });
}

export default router;
