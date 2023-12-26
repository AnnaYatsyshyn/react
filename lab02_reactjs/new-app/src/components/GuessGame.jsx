// GuessGame.js
import React, { useState } from 'react';
import './GuessGame.css';

const GuessGame = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [numberToGuess, setNumberToGuess] = useState(null);
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);

    const startNewGame = () => {
        setGameStarted(true);
        setNumberToGuess(generateRandomNumber());
        setUserGuess('');
        setFeedback('');
        setAttempts(0);
    };

    const handleInputChange = (event) => {
        setUserGuess(event.target.value);
    };

    const handleCheck = () => {
        const guess = parseInt(userGuess, 10);
        if (isNaN(guess) || guess < 1 || guess > 1000) {
            setFeedback('Введіть число від 1 до 1000');
            return;
        }

        setAttempts(attempts + 1);

        if (guess === numberToGuess) {
            setFeedback('Good Job!');
            setGameStarted(false);
        } else if (guess < numberToGuess) {
            setFeedback(`Ваше число невірно. Воно більше ніж ${guess}`);
        } else {
            setFeedback(`Ваше число невірно. Воно менше ніж ${guess}`);
        }

        if (attempts === 10) {
            setFeedback('Game Over!');
            setGameStarted(false);
        }
    };

    const generateRandomNumber = (min, max) => {
        const randomNumber = Math.floor(Math.random() * 20) * 50; // Генеруємо випадкове число, кратне 50
        return randomNumber < 1000 ? randomNumber : 950; // Перевіряємо, чи не перевищує число 1000

    };

    const attemptsLeft = 10 - attempts;

    return (
        <div className="guess-game-container"> {/* Додайте клас для зовнішнього контейнера */}

            <h1>Гра "Вгадай число"</h1>
            {!gameStarted && (
                <button onClick={startNewGame} disabled={gameStarted}>
                    New Game
                </button>
            )}
            {gameStarted && (
                <div>
                    <p>Спроб залишилося: {attemptsLeft}</p>
                    <input
                        type="text"
                        value={userGuess}
                        onChange={handleInputChange}
                        placeholder="Введіть число"
                    />
                    <button onClick={handleCheck}>Check</button>
                </div>
            )}
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default GuessGame;
