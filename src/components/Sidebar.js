import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { getSpecificLogo } from "../helpers/logoHelper";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Per il pulsante di chiusura mobile

function Sidebar({
  menuItems = [],
  user,
  loadingUser,
  bottomNav,
  activePath = "",
  isMobileOpen = false, // Nuovo prop per mobile
  onMobileClose, // Nuovo prop per chiudere la sidebar mobile
}) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoLoading, setLogoLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        setLogoLoading(true);
        const url = await getSpecificLogo("Logo-2.2");
        setLogoUrl(url);
      } catch (error) {
        console.error("Error loading logo:", error);
      } finally {
        setLogoLoading(false);
      }
    };

    fetchLogo();
  }, []);

  // Chiude la sidebar quando si clicca sull'overlay
  const handleOverlayClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Overlay per mobile */}
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
      
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Pulsante di chiusura per mobile */}
        <button className="mobile-close-btn" onClick={onMobileClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <Link to="/dashboard" className="logo">
          {logoLoading ? (
            <div
              className="skeleton skeleton-logo"
              style={{
                width: "200px",
                height: "80px",
                margin: "0 auto",
              }}
              draggable="false"
            />
          ) : logoUrl ? (
            <img
              src={logoUrl}
              alt="HomeCloud Logo"
              style={{
                width: "200px",
                height: "80px",
                margin: "0 auto",
              }}
              draggable="false"
            />
          ) : (
            <div
              style={{
                width: "200px",
                height: "80px",
                margin: "0 auto",
              }}
              draggable="false"
            />
          )}
        </Link>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={activePath === item.path ? "active" : ""}
              >
                <Link to={item.path} onClick={onMobileClose}>
                  <FontAwesomeIcon icon={item.icon} className="icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href="/profile" className="user-profile" onClick={onMobileClose}>
          <div className="avatar">
            {loadingUser ? (
              <div className="skeleton skeleton-avatar"></div>
            ) : user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Avatar"
                className="avatar-image"
                draggable="false"
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
    </>
  );
}

export default Sidebar;
