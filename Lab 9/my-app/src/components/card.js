import React from "react";
import "./card.css";

const Card = () => {
  const cardData = [
    {
      id: 1,
      title: "Nature",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      description:
        "Beautiful forest landscape with sunlight streaming through the trees.",
      tag: "Landscape",
    },
    {
      id: 2,
      title: "Ocean",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0",
      description:
        "Serene ocean waves with a stunning sunset in the background.",
      tag: "Seascape",
    },
    {
      id: 3,
      title: "Mountains",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      description:
        "Majestic mountain peaks covered in snow under a clear blue sky.",
      tag: "Mountain",
    },
  ];

  return (
    <div className="cards-container">
      {cardData.map((card) => (
        <div key={card.id} className="card">
          <div className="card-image-container">
            <img src={card.image} alt={card.title} className="card-image" />
            <span className="card-tag">{card.tag}</span>
          </div>
          <div className="card-content">
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
            <button className="card-button">Learn More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
