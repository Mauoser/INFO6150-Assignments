import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Counter</h2>
      <div style={{ fontSize: "24px", margin: "10px" }}>Count: {count}</div>
      <div>
        <button
          onClick={handleIncrement}
          style={{
            margin: "5px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Increment
        </button>
        <button
          onClick={handleDecrement}
          style={{
            margin: "5px",
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
