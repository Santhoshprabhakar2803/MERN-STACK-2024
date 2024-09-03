import React from 'react';
import './assets/css/style.css'; // Ensure this path is correct based on your project structure

const Home = () => {
    return (
        <div className="container">
            {/* Add your HTML template content here */}

            <header>
                <h1>Welcome to Stopwatch</h1>
                <p>Your time management solution</p>
            </header>

            <section>
                <div className="stopwatch">
                    <h2>Stopwatch</h2>
                    <div id="timer">
                        <span className="minutes">00</span>:<span className="seconds">00</span>:<span className="milliseconds">00</span>
                    </div>
                    <div className="controls">
                        <button id="start">Start</button>
                        <button id="stop">Stop</button>
                        <button id="reset">Reset</button>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2024 Stopwatch. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
