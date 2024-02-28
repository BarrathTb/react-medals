import React, { useState } from 'react';
import '../App.css'; // Make sure to import the CSS

// MarioCoinAnimation hook manages the coins array state and provides a method to trigger new coins
export const useMarioCoinAnimation = () => {
  const [coins, setCoins] = useState([]);

  const createCoin = (x, y) => {
    const newCoin = {
      key: Math.random(), 
      style: {
        left: `${x}px`,
        top: `${y}px`
      }
    };

    setCoins(coins.concat(newCoin));

    setTimeout(() => {
      setCoins((coins) => coins.filter((coin) => coin.key !== newCoin.key));
    }, 500); // Assume the coin animation takes 500ms
  };

  return { coins, createCoin };
};

function MarioCoinButton(props) {
  const { coins, createCoin } = useMarioCoinAnimation();

  return (
    <>
      {props.children((x, y) => createCoin(x, y))}
      {coins.map((coin) => (
        <div key={coin.key} className="coin" style={coin.style}></div>
      ))}
    </>
  );
}

export default MarioCoinButton;
