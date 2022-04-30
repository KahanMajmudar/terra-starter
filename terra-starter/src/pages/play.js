import { Link } from "react-router-dom";
import * as execute from "../contract/execute";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";

const Play = () => {
  const connectedWallet = useConnectedWallet();
  const playTime = 30;

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(playTime);
  const [gameOver, setGameOver] = useState(false);
  const [targetPositionAsh, setTargetPositionAsh] = useState({
    top: "15%",
    left: "75%",
  });

  const [targetPositionJager, setTargetPositionJager] = useState({
    top: "15%",
    left: "25%",
  });

  const [loading, setLoading] = useState(false);

  // Decrease time every second
  useEffect(() => {
    const unsubscribe = setInterval(() => {
      setTime((time) => (time > 0 ? time - 1 : 0));
    }, 1000);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (time === 0) {
      setTargetPositionAsh({ display: "none" });
      setTargetPositionJager({ display: "none" });
      // Show alert to let user know it's game over
      alert(
        `Game Over! Your score is ${score}. Please confirm transaction to submit score.`
      );
      submitScore();
    }
  }, [time]);

  const submitScore = async () => {
    if (connectedWallet && connectedWallet.network.name === "testnet") {
      setLoading(true);
      const tx = await execute.setScore(connectedWallet, score);
      console.log(tx);
      alert("Score submitted!");
      setLoading(false);
      window.location.href = "/leaderboard";
    }
  };

  const handleClickAsh = (e) => {
    // only double clicks allowed
    if (e.detail === 2) {
      // OGs will know this :)
      let audio = new Audio("/Zergling_explodes.mp3");

      // Don't let it get too loud!
      audio.volume = 0.2;
      audio.play();

      setScore((score) => score + 2);

      // Play around with this to control bounds!
      setTargetPositionAsh({
        top: `${Math.floor(Math.random() * 50)}%`,
        left: `${Math.floor(Math.random() * 50)}%`,
      });
    }
  };

  const handleClickJager = () => {
    // OGs will know this :)
    let audio = new Audio("/Zergling_explodes.mp3");

    // Don't let it get too loud!
    audio.volume = 0.2;
    audio.play();

    setScore((score) => score + 1);

    // Play around with this to control bounds!
    setTargetPositionJager({
      top: `${Math.floor(Math.random() * 50)}%`,
      left: `${Math.floor(Math.random() * 50)}%`,
    });
  };

  return (
    <div className="score-board-container">
      <div className="play-container">
        <span>Score: {score}</span>
        <span>Fight!</span>
        <span>Time left: {time} s</span>
      </div>

      {/* Render loading or game container */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="game-container">
          <img
            src={"ash.jpg"}
            id="target"
            alt="Target"
            className="char"
            style={{ ...targetPositionAsh }}
            onClick={handleClickAsh}
          />
          <img
            src={"jager.jpg"}
            id="target"
            alt="Target"
            className="char"
            style={{ ...targetPositionJager }}
            onClick={handleClickJager}
          />
          <img src="Marine.png" id="marine-img" alt="Marine" />
        </div>
      )}
    </div>
  );
};

export default Play;
