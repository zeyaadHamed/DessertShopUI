import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Cardcomponent/Card";
import Cart from "./components/Cartcomponent/Cart";
import Products from "./assets/data/data.json";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.name === product.name);
      if (found) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === product.name ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <>
      <h1>Dessert</h1>
      <section className="dessert-shop">
        <div className="container">
          {Products.map((product) => (
            <Card
              key={product.name}
              img={product.image.desktop}
              name={product.name}
              price={product.price}
              category={product.category}
              quantity={
                cartItems.find((item) => item.name === product.name)?.qty || 0
              }
              onAdd={() =>
                addToCart({
                  name: product.name,
                  price: product.price,
                  img: product.image.desktop,
                })
              }
              onRemove={() => removeFromCart(product)}
            />
          ))}
        </div>
        <Cart
          cartItems={cartItems}
          onRemove={(item) =>
            setCartItems((prev) => prev.filter((i) => i.name !== item.name))
          }
          setCartItems={setCartItems}
        />
      </section>
    </>
  );
};

export default App;
