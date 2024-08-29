import React, { useState } from 'react';
import '../css/CoinFlip.css'; // Import the CSS file for animation
import coinImage from '../assets/coin.png'; // Replace with the correct path to your coin image
import flipSoundFile from '../assets/flip-sound.m4a'; // Replace with the correct path to your sound file

const CoinFlip = () => {
  const [side, setSide] = useState('Heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [showText, setShowText] = useState(false);

  const flipSound = new Audio(flipSoundFile);

  const flipCoin = () => {
    setIsFlipping(true);
    setShowText(false);

      // Play the flip sound when spinning starts
      flipSound.play();

    // Randomly determine the outcome
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    // Simulate the flip animation duration
    setTimeout(() => {
      setSide(result); // Update the state to the result after the animation
      setIsFlipping(false);

      // Show the text after the flip is complete
      setTimeout(() => {
        setShowText(true);
      }, 1500); // Slight delay to ensure text appears after the animation
    }, 2000); // 2 seconds flipping duration
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Coin Flip</h2>
      <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
        <div className={`coin-side heads`}>
          <img src={coinImage} alt="Heads" className="coin-image" />
          <div className={`coin-text ${showText ? 'show-text' : ''}`}>{side}</div>
        </div>
        <div className={`coin-side tails`}>
          <img src={coinImage} alt="Tails" className="coin-image" />
          <div className={`coin-text ${showText ? 'show-text' : ''}`}></div>
        </div>
      </div>
      <button onClick={flipCoin} style={{ marginTop: '20px' }}>
        Flip Coin
      </button>
    </div>
  );
};

export default CoinFlip;
