import React, { forwardRef } from "react";
import Card from "./Card";

const Board = forwardRef(
  ({ cards, flippedCards, matchedCards, onCardClick }, ref) => {
    return (
      <div className="board" ref={ref}>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            isFlipped={
              flippedCards.includes(index) || matchedCards.includes(index)
            }
            onClick={() => onCardClick(index)}
          />
        ))}
      </div>
    );
  }
);

export default Board;