import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({
  menuItems = [],
  user,
  loadingUser,
  bottomNav,
  activePath = "",
}) {
  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="logo">
        <span>Home</span>Cloud
      </Link>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={activePath === item.path ? "active" : ""}
            >
              <Link to={item.path}>
                <FontAwesomeIcon icon={item.icon} className="icon" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a href="/profile" className="user-profile">
        <div className="avatar">
          {loadingUser ? (
            <div className="skeleton skeleton-avatar"></div>
          ) : user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Avatar"
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder"></div>
          )}
        </div>
        <div className="user-info">
          {loadingUser ? (
            <>
              <div className="skeleton skeleton-name"></div>
              <div className="skeleton skeleton-email"></div>
            </>
          ) : (
            <>
              <div className="name">{user?.full_name || "Nome Utente"}</div>
              <div className="email">{user?.email || "email@example.com"}</div>
            </>
          )}
        </div>
      </a>
      <nav className="sidebar-bottom-nav">{bottomNav}</nav>
    </aside>
  );
}

export default Sidebar;
