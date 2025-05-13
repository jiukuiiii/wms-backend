// 前端使用 React + TailwindCSS
// 后端接口假设为 REST API，使用 Express 提供数据

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductEntry() {
  const [product, setProduct] = useState({
    boxBarcode: "",
    productBarcode: "",
    name: "",
    spec: "",
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!product.productBarcode || !product.name) {
      alert("产品条码和名称不能为空");
      return;
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        alert("保存成功");
        setProduct({ boxBarcode: "", productBarcode: "", name: "", spec: "", stock: 0 });
      } else {
        alert("保存失败");
      }
    } catch (err) {
      alert("网络错误");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-bold">产品信息录入</h2>
          <Input
            name="boxBarcode"
            placeholder="箱子条码（可选）"
            value={product.boxBarcode}
            onChange={handleChange}
          />
          <Input
            name="productBarcode"
            placeholder="产品条码（必填）"
            value={product.productBarcode}
            onChange={handleChange}
          />
          <Input
            name="name"
            placeholder="产品名称（中/英文）"
            value={product.name}
            onChange={handleChange}
          />
          <Input
            name="spec"
            placeholder="规格（如 500g*12）"
            value={product.spec}
            onChange={handleChange}
          />
          <Input
            name="stock"
            placeholder="库存数量"
            type="number"
            value={product.stock}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} className="w-full">保存</Button>
        </CardContent>
      </Card>
    </div>
  );
}
