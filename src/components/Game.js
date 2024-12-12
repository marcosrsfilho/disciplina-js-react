import React, { useState, useEffect, useCallback, useRef } from "react";
import Board from "./Board";
import "../style.css";

function Game() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [cardCount, setCardCount] = useState(12);

  const boardRef = useRef(null);

  const generateCards = useCallback((count) => {
    const initialCards = [
      { name: "card1", image: "/images/card1.png" },
      { name: "card2", image: "/images/card2.png" },
      { name: "card3", image: "/images/card3.png" },
      { name: "card4", image: "/images/card4.png" },
      { name: "card5", image: "/images/card5.png" },
      { name: "card6", image: "/images/card6.png" },
      { name: "card7", image: "/images/card7.png" },
      { name: "card8", image: "/images/card8.png" },
      { name: "card9", image: "/images/card9.png" },
      { name: "card10", image: "/images/card10.png" },
      { name: "card11", image: "/images/card11.png" },
      { name: "card12", image: "/images/card12.png" },
      { name: "card13", image: "/images/card13.png" },
      { name: "card14", image: "/images/card14.png" },
      { name: "card15", image: "/images/card15.png" },
    ];

    const shuffledCards = shuffle(initialCards);
    const selectedCards = shuffledCards.slice(0, count / 2);
    const doubledCards = [...selectedCards, ...selectedCards];
    const finalShuffledCards = shuffle(doubledCards);

    setCards(finalShuffledCards);
  }, []);

  useEffect(() => {
    generateCards(cardCount);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameOver(false);
  }, [cardCount, generateCards]);

  useEffect(() => {
    if (boardRef.current) {
      if (cardCount === 12) {
        boardRef.current.style.gridTemplateColumns = "repeat(4, 1fr)";
      } else if (cardCount === 20) {
        boardRef.current.style.gridTemplateColumns = "repeat(5, 1fr)";
      } else {
        boardRef.current.style.gridTemplateColumns = "repeat(6, 1fr)";
      }
    }
  }, [cardCount]);

  const handleCardClick = (index) => {
    if (flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    setFlippedCards([...flippedCards, index]);
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;

      if (cards[firstIndex].name === cards[secondIndex].name) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }

    if (matchedCards.length === cards.length && moves > 0) {
      setGameOver(true);
    }
  }, [flippedCards, cards, matchedCards, moves]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleReset = () => {
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    generateCards(cardCount);
  };

  return (
    <div className="game">
      <h1>JOGO DA MEMÓRIA DO METAAAAAAAAL</h1>

      <select
        value={cardCount}
        onChange={(e) => setCardCount(parseInt(e.target.value, 10))}
      >
        <option value={12}>12 cartas (Fácil)</option>
        <option value={20}>20 cartas (Médio)</option>
        <option value={30}>30 cartas (Difícil)</option>
      </select>

      <Board
        ref={boardRef}
        cards={cards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onCardClick={handleCardClick}
      />
      <p>Movimentos: {moves}</p>

      {gameOver && (
        <div>
          <h2>PARABÉNS, VOCÊ É TRUE METAL!</h2>
        </div>
      )}

      <button onClick={handleReset}>REINICIAR</button>
    </div>
  );
}

export default Game;