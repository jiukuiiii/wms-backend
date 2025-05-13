
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/wms";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// 商品模型定义
const productSchema = new mongoose.Schema({
  boxBarcode: { type: String, default: "" },
  productBarcode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  spec: { type: String },
  stock: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

// 添加商品
app.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const existing = await Product.findOne({ productBarcode: data.productBarcode });
    if (existing) return res.status(400).json({ message: "该产品条码已存在" });
    const newProduct = new Product(data);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "服务器错误" });
  }
});

// 获取商品列表
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 更新商品
app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "未找到商品" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "更新失败" });
  }
});

// 删除商品
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "未找到商品" });
    res.json({ message: "删除成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "删除失败" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 服务器启动于 http://localhost:${PORT}`);
});
