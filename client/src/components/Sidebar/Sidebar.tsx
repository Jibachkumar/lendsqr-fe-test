import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavIcon = ({ img }: { img: string }) => (
  <img className="icon" src={img} alt="" />
);

const navSections = [
  {
    title: "Customers",
    items: [
      {
        label: "Users",
        path: "/dashboard",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779738936/user-friends_1_lcyzz9.png",
      },
      {
        label: "Guarantors",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739131/users_1_jtpr3o.png",
      },
      {
        label: "Loans",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739039/sack_1_dhocqp.png",
      },
      {
        label: "Decision Models",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739166/handshake-regular_1_ob74h2.png",
      },
      {
        label: "Savings",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739206/piggy-bank_1_bincxe.png",
      },
      {
        label: "Loan Requests",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739270/Group_104_dpfd4d.png",
      },
      {
        label: "Whitelist",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739339/user-check_1_w1fpaz.png",
      },
      {
        label: "Karma",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739382/user-times_1_bdlayj.png",
      },
    ],
  },
  {
    title: "Businesses",
    items: [
      {
        label: "Organization",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779738308/briefcase_1_xa0cyz.png",
      },
      {
        label: "Loan Products",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739270/Group_104_dpfd4d.png",
      },
      {
        label: "Savings Products",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739797/Group_1_broqn6.png",
      },
      {
        label: "Fees and Charges",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739847/coins-solid_1_yndow2.png",
      },
      {
        label: "Transactions",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739902/icon_1_esmt7u.png",
      },
      {
        label: "Services",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739938/galaxy_1_c3r3yz.png",
      },
      {
        label: "Service Account",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779739999/user-cog_1_pgzywq.png",
      },
      {
        label: "Settlements",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779740050/scroll_1_wh89sx.png",
      },
      {
        label: "Reports",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779740109/chart-bar_2_buv5gr.png",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Preferences",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779740150/sliders-h_1_lvw8lm.png",
      },
      {
        label: "Fees and Pricing",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779740193/badge-percent_1_xjurwe.png",
      },
      {
        label: "Audit Logs",
        icon: "https://res.cloudinary.com/dhadohg2h/image/upload/v1779740245/clipboard-list_1_q9tscm.png",
      },
    ],
  },
];

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-overlay ${
          isOpen ? "sidebar-overlay--visible" : ""
        }`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__org-switcher">
          <img
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779738308/briefcase_1_xa0cyz.png"
            alt="switch"
          />

          <span>Switch Organization</span>

          <svg
            width="12"
            height="12"
            viewBox="0 0 10 10"
            fill="none"
            style={{ marginLeft: "auto" }}
          >
            <path
              d="M1 3l4 4 4-4"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className={`sidebar__nav-item-dashboard`} onClick={onClose}>
          <NavIcon img="https://res.cloudinary.com/dhadohg2h/image/upload/v1779738641/home_1_d1lwqt.png" />
          Dashboard
        </div>

        {navSections.map((section) => (
          <div key={section.title} className="sidebar__section">
            <p className="sidebar__section-title">{section.title}</p>

            {section.items.map((item) =>
              item.path ? (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar__nav-item ${
                      isActive ? "sidebar__nav-item--active" : ""
                    }`
                  }
                  onClick={onClose}
                >
                  <NavIcon img={item.icon} />
                  {item.label}
                </NavLink>
              ) : (
                <div key={item.label} className="sidebar__nav-item">
                  <NavIcon img={item.icon} />
                  {item.label}
                </div>
              ),
            )}
          </div>
        ))}
      </aside>
    </>
  );
}

export default Sidebar;
