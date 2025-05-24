const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order endpoints
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, ordersController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retrieve an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, ordersController.getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       description: Order creation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productCode
 *                     - quantity
 *                   properties:
 *                     productCode:
 *                       type: string
 *                       description: Product code identifier
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, ordersController.createOrder);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Returns all orders for a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User Order List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   total:
 *                     type: number
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                         unitPrice:
 *                           type: number
 *                         subtotal:
 *                           type: number
 *                   user:
 *                     type: string
 *       500:
 *         description: Error fetching orders
 */
router.get("/user/:userId", ordersController.getOrdersByUser);

module.exports = router;
