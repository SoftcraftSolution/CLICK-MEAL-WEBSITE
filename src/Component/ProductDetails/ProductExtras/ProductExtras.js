import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productextra.css";
import extraImage from "../../../assets/burgerphoto.png";

const ProductExtras = ({ product1 }) => {
  const [product, setProduct] = useState(null);
  const [extras, setExtras] = useState([]); // State for extras
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId") || ""; // Retrieve userId from localStorage or use an empty string as fallback

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product1) {
        setError("No item ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://clickmeal-backend.vercel.app/user/item-by-id/?itemId=${product1._id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [product1._id]);

  // Fetch extras
  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await axios.get(
          "https://clickmeal-backend.vercel.app/user/get-extrameal"
        );
        if (response.data && response.data.data) {
          setExtras(response.data.data);
        } else {
          setExtras([]);
        }
      } catch (error) {
        console.error("Error fetching extras:", error);
        setError("Failed to load extras. Please try again.");
      }
    };

    fetchExtras();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (itemId, isExtra = false) => {
    if (!userId) {
      alert("User ID is missing. Please log in.");
      return;
    }

    try {
      const payload = {
        userId,
        items: [
          { itemId, quantity: 1 } // Use dynamic itemId
        ]
      };

      const response = await axios.post(
        "https://clickmeal-backend.vercel.app/user/add-cart",
        payload
      );
      console.log("Add to Cart Response:", response.data);

      if (response.data && response.data.message) {
        alert(`${isExtra ? "Extra item" : "Product"} added to cart successfully!`);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add items to cart. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product details available.</p>;
  }

  return (
    <div className="product-extras">
      <div style={{ fontWeight: "700", fontSize: "24px" }}>{product.itemName}</div>
      <div style={{ fontWeight: "700", fontSize: "20px" }}>₹{product.price}</div>

      {/* Product Details */}


      {/* Extras Section */}


    </div>
  );
};

export default ProductExtras;
