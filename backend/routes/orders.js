// import express from 'express';
// import { body, validationResult } from 'express-validator';
// import Order from '../models/Order.js';
// import Product from '../models/Product.js';
// import { authenticate, adminOnly } from '../middleware/auth.js';

// const router = express.Router();

// // Create order (customer)
// router.post('/', authenticate, [
//   body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
//   body('shippingAddress.name').trim().isLength({ min: 2 }).withMessage('Name is required'),
//   body('shippingAddress.phone').trim().isLength({ min: 10 }).withMessage('Valid phone number is required'),
//   body('shippingAddress.street').trim().isLength({ min: 5 }).withMessage('Street address is required'),
//   body('shippingAddress.city').trim().isLength({ min: 2 }).withMessage('City is required'),
//   body('shippingAddress.pincode').trim().isLength({ min: 6, max: 6 }).withMessage('Valid pincode is required'),
//   body('paymentMethod').isIn(['UPI', 'GPay', 'Cash on Delivery']).withMessage('Invalid payment method')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { items, shippingAddress, paymentMethod } = req.body;

//     // Validate products and calculate total
//     let totalAmount = 0;
//     const orderItems = [];

//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product || !product.isActive) {
//         return res.status(400).json({ message: `Product ${item.product} not found or inactive` });
//       }

//       if (product.stock < item.quantity) {
//         return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
//       }

//       orderItems.push({
//         product: product._id,
//         quantity: item.quantity,
//         price: product.price
//       });

//       totalAmount += product.price * item.quantity;

//       // Update stock
//       product.stock -= item.quantity;
//       await product.save();
//     }

//     const order = new Order({
//       customer: req.user._id,
//       items: orderItems,
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//       paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Pending'
//     });

//     await order.save();
//     await order.populate('items.product customer');

//     res.status(201).json({ message: 'Order placed successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get customer orders
// router.get('/my-orders', authenticate, async (req, res) => {
//   try {
//     const orders = await Order.find({ customer: req.user._id })
//       .populate('items.product')
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Cancel order (customer)
// router.patch('/:id/cancel', authenticate, [
//   body('reason').trim().isLength({ min: 5 }).withMessage('Cancellation reason is required')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const order = await Order.findOne({ _id: req.params.id, customer: req.user._id });
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     if (order.orderStatus === 'Cancelled') {
//       return res.status(400).json({ message: 'Order already cancelled' });
//     }

//     if (order.orderStatus === 'Delivered') {
//       return res.status(400).json({ message: 'Cannot cancel delivered order' });
//     }

//     // Restore stock
//     for (const item of order.items) {
//       const product = await Product.findById(item.product);
//       if (product) {
//         product.stock += item.quantity;
//         await product.save();
//       }
//     }

//     order.orderStatus = 'Cancelled';
//     order.cancellationReason = req.body.reason;
//     order.cancelledAt = new Date();
//     await order.save();

//     res.json({ message: 'Order cancelled successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Admin routes
// router.use(adminOnly);

// // Get all orders (admin)
// router.get('/admin/all', async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate('customer items.product')
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Update order status (admin)
// router.patch('/:id/status', [
//   body('status').isIn(['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']).withMessage('Invalid status')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus: req.body.status },
//       { new: true }
//     ).populate('customer items.product');

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json({ message: 'Order status updated', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// export default router;


import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

/* ----------------------------------
   CUSTOMER ROUTES (with auth)
---------------------------------- */

// Create a new order
router.post('/', authenticate, [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('shippingAddress.name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('shippingAddress.phone').trim().isLength({ min: 10 }).withMessage('Valid phone number is required'),
  body('shippingAddress.street').trim().isLength({ min: 5 }).withMessage('Street address is required'),
  body('shippingAddress.city').trim().isLength({ min: 2 }).withMessage('City is required'),
  body('shippingAddress.pincode').trim().isLength({ min: 6, max: 6 }).withMessage('Valid pincode is required'),
  body('paymentMethod').isIn(['UPI', 'GPay', 'Cash on Delivery']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { items, shippingAddress, paymentMethod } = req.body;
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive)
        return res.status(400).json({ message: `Product ${item.product} not found or inactive` });

      if (product.stock < item.quantity)
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      customer: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Pending'
    });

    await order.save();
    await order.populate('items.product customer');

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get logged-in customer's orders
router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel an order
router.patch('/:id/cancel', authenticate, [
  body('reason').trim().isLength({ min: 5 }).withMessage('Cancellation reason is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const order = await Order.findOne({ _id: req.params.id, customer: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (['Cancelled', 'Delivered'].includes(order.orderStatus))
      return res.status(400).json({ message: `Cannot cancel an already ${order.orderStatus.toLowerCase()} order` });

    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.orderStatus = 'Cancelled';
    order.cancellationReason = req.body.reason;
    order.cancelledAt = new Date();
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ----------------------------------
   ADMIN ROUTES (with auth + role)
---------------------------------- */

// Protect admin routes
router.use(authenticate, adminOnly);

// Get all orders (admin only)
router.get('/admin/all', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.patch('/:id/status', [
  body('status').isIn(['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    ).populate('customer items.product');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
