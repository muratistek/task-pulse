import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { useState } from 'react'

export default function Sidebar() {
  const { user } = useAuthContext()

  let sidebarColor = window.localStorage.getItem('sidebarColor')
  let mainTheme = window.localStorage.getItem('mainTheme')

  // color picker - sidebar
  const [selectedColor, setSelectedColor] = useState(!sidebarColor ? '#8d69f1' : sidebarColor); // Initial selected color
  const [showSidebarOptions, setShowSidebarOptions] = useState(false); // State to toggle options visibility

  // color picker - dashboard
  const [mainThemeColor, setMainThemeColor] = useState(!mainTheme ? 'light' : 'dark');
  const [showMainThemeOptions, setShowMainThemeOptions] = useState(false);

  const sidebarColorOptions = [
    '#3AEF55', // Green
    '#f1348d', // Pink
    '#f18d03', // Orange
    '#8d69f1', // Purple
  ];

  // const mainThemeOptions = {
  //   light: '#fff',
  //   dark: '#000'
  // }

  const handleColorChange = (color) => {
    setSelectedColor(color);
    window.localStorage.setItem('sidebarColor', color)
    setShowSidebarOptions(false);
  };

  return (
    <div className='sidebar' style={{ backgroundColor: `${selectedColor}` }}>
      <div className='sidebar-content'>
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='customize-theme'>
          <p>Customize Theme</p>
          {/* Color Picker - Sidebar */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: selectedColor,
                border: '2px solid #444',
                cursor: 'pointer',
                marginTop: '20px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              onClick={() => setShowSidebarOptions(!showSidebarOptions)}
            ></div>
            {/* Color Picker - Dashboard */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: selectedColor,
                border: '2px solid #444',
                cursor: 'pointer',
                marginTop: '20px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              onClick={() => setShowSidebarOptions(!showSidebarOptions)}
            ></div>
          </div>
          {/* Color Options - Sidebar */}
          {showSidebarOptions && (
            <div style={{ marginTop: '10px' }}>
              {sidebarColorOptions.map((color, index) => (
                <button
                  key={index}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    margin: '5px',
                    border: selectedColor === color ? '2px solid #000000' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>
          )}

          {/* Color Options - Dashboard */}
          {showSidebarOptions && (
            <div style={{ marginTop: '10px' }}>
              {sidebarColorOptions.map((color, index) => (
                <button
                  key={index}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    margin: '5px',
                    border: selectedColor === color ? '2px solid #000000' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
