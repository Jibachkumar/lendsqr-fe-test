import "./App.scss";
import "./styles/global.scss";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const cards = [
    {
      img: "https://res.cloudinary.com/dhadohg2h/image/upload/v1780155922/Screenshot_2026-05-30_212849_kyc5is.png",
      route: "/login",
      title: "Login Page",
    },
    {
      img: "https://res.cloudinary.com/dhadohg2h/image/upload/v1780156086/Screenshot_2026-05-30_213242_mqfgje.png",
      route: "/dashboard",
      title: "Dashboard Page",
    },
    {
      img: "https://res.cloudinary.com/dhadohg2h/image/upload/v1780156598/Screenshot_2026-05-30_214120_ftwsxc.png",
      route: "/dashboard/users",
      title: "Users Page",
    },
  ];

  return (
    <>
      <h2 className="explore-title">Hover to Explore Tasks</h2>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.img} alt={card.title} className="card__image" />
            <div className="card__overlay" />
            <div className="card__content">
              <h3 className="card__title">{card.title}</h3>
              <button
                className="card__btn"
                onClick={() => navigate(card.route)}
              >
                View Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
