import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";

import Play from "./pages/play";
import Leaderboard from "./pages/leaderboard";
import Guide from "./pages/guide";

import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

getChainOptions().then((chainOpts) => {
  ReactDOM.render(
    <React.StrictMode>
      <WalletProvider {...chainOpts}>
        <div className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/play" element={<Play />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/guide" element={<Guide />} />
            </Routes>
          </BrowserRouter>

          <div className="footer-container">
            <img
              alt="Twitter Logo"
              className="twitter-logo"
              src="/twitter-logo.svg"
            />
            <a
              className="footer-text"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`Made with @${TWITTER_HANDLE}`}</a>
          </div>
        </div>
      </WalletProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});