import { Link } from "react-router-dom";

const menu_opts = [
  {
    name: "Play",
    link: "/play",
  },
  { name: "Leaderboard", link: "/leaderboard" },
  { name: "How to play", link: "/guide" },
];

const Menu = () => {
  const renderMenu = () => {
    return menu_opts.map((ele, idx) => {
      const { name, link } = ele;

      return (
        <Link to={link} key={idx} className="menu-item">
          <span className="item-text">{name}</span>
        </Link>
      );
    });
  };
  return <div className="game-menu">{renderMenu()}</div>;
};

export default Menu;
