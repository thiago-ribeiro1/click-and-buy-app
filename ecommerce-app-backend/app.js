const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");
require("dotenv").config();
const Product = require("./public/src/models/Product");

const authRoutes = require("./public/src/routes/authRoutes");
const userRoutes = require("./public/src/routes/userRoutes");
const productRoutes = require("./public/src/routes/productRoutes");
const orderRoutes = require("./public/src/routes/orderRoutes");
const profileRoutes = require("./public/src/routes/profileRoutes");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Executa o script generateProductsJson.js para gerar o arquivo products.json
const { execSync } = require("child_process");

try {
  execSync("node ./scripts/generateProductsJson.js", { stdio: "inherit" });
  console.log("generateProductsJson.js executed successfully.");
} catch (error) {
  console.error("Error generating products.json:", error);
}

// products.json
const products = require("./products.json");

const app = express();
const server = http.createServer(app); // Create HTTP server for WebSocket

// Request logger (método, rota, status e duração)
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const ms = Date.now() - start;
    const ts = new Date().toISOString();
    console.log(
      `[${ts}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`
    );
  });

  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.static("public"));

// Conexão com o MongoDB
mongoose.connect(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/clickandbuy"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // Populando o banco de dados com produtos iniciais se não houver produtos
  async function seedDatabase() {
    try {
      const existingProducts = await Product.countDocuments();

      if (existingProducts === 0) {
        await Product.insertMany(products);
        console.log("Database has been seeded");
      } else {
        console.log("The database already contains products");
      }
    } catch (error) {
      console.error("Error seeding the database:", error);
    }
  }

  seedDatabase();
});

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Click And Buy API",
      version: "1.0.0",
      description: "API documentation for Click And Buy store",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./public/src/routes/*.js", "./public/src/controllers/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);

// WebSocket Server
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Client connected on WebSocket");

  socket.on("message", (message) => {
    // message event
    const shouldDebugWs = process.env.WS_DEBUG === "1";
    if (shouldDebugWs) {
      const msg = message.toString();
      const preview = msg.length > 200 ? msg.substring(0, 200) + "..." : msg;
      console.log(`[WS] message received by ${preview} (${msg.length} chars)`);
    }

    // Broadcast para todos os clientes
    wss.clients.forEach((client) => {
      if (client.readyState === socket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected from WebSocket");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});
