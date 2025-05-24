const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findOne({
          productCode: item.productCode,
        });
        if (!product) {
          throw new Error(`Product not found: ${item.productCode}`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          unitPrice: product.currentPrice,
          subtotal: product.currentPrice * item.quantity,
        };
      })
    );

    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    const newOrder = new Order({
      user: user._id,
      items: orderItems,
      total,
    });

    await newOrder.save();

    user.orders.push(newOrder._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate("user")
      .populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// get orders by user ID
exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ orderDate: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};
