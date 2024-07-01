import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", price: 0 });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://minnnisu.iptime.org/api/products");
    setProducts(response.data);
  };

  const createProduct = async () => {
    await axios.post("http://minnnisu.iptime.org/api/products", product);
    setProduct({ name: "", price: 0 });
    fetchProducts();
  };

  const updateProduct = async (id) => {
    await axios.put(`http://minnnisu.iptime.org/api/products/${id}`, product);
    setProduct({ name: "", price: 0 });
    setEditing(false);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://minnnisu.iptime.org/api/products/${id}`);
    fetchProducts();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateProduct(product.id) : createProduct();
  };

  return (
    <div>
      <h1>상품 등록 앱 Ver.3</h1>
      <div className="form-container">
        <h2>상품 등록</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="상품 이름"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="가격"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseInt(e.target.value) })
            }
          />
          <button type="submit">{editing ? "수정" : "추가"}</button>
        </form>
      </div>

      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            상품명 - {prod.name} ({prod.price}원)
            <div className="button-container">
              <button
                onClick={() => {
                  setEditing(true);
                  setProduct(prod);
                }}
              >
                수정
              </button>
              <button onClick={() => deleteProduct(prod.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
