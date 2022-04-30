import "./App.css";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Menu from "./components/Menu";
import WalletAddress from "./components/Wallet";

function App() {
  const { status, connect, disconnect, availableConnectTypes } = useWallet();

  console.log({ status, availableConnectTypes });

  const renderConnectButton = () => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED)
      return (
        <div className="connect-wallet-div">
          <button
            type="button"
            key={`connect-EXTENSION`}
            onClick={() => connect("EXTENSION")}
            className="cta-button connect-wallet-button"
          >
            Connect wallet
          </button>
        </div>
      );

    if (status === WalletStatus.WALLET_CONNECTED)
      return (
        <button
          type="button"
          onClick={() => disconnect()}
          className="cta-button connect-wallet-button"
        >
          Disconnect
        </button>
      );
  };

  return (
    <main className="App">
      <header>
        <div className="header-titles">
          <h1>⚔ Goblin War ⚔</h1>
          <p>Only you can save us from Goblin town</p>
        </div>
      </header>

      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <div>
          <img
            src="https://media.giphy.com/media/B19AYwNXoXtcs/giphy.gif"
            alt="Goblin gif"
          />
        </div>
      )}

      {status === WalletStatus.WALLET_CONNECTED && (
        <div className="game-menu-container">
          <Menu />
          <WalletAddress />
        </div>
      )}

      {renderConnectButton()}
    </main>
  );
}

export default App;
