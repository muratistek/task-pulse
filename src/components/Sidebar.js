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
  const [mainThemeColor, setMainThemeColor] = useState(!mainTheme || mainTheme !== 'dark' ? '#f4f4f4' : '#1b1b1b');
  const [showMainThemeOptions, setShowMainThemeOptions] = useState(false);

  const sidebarColorOptions = [
    '#3AEF55', // Green
    '#f1348d', // Pink
    '#f18d03', // Orange
    '#8d69f1', // Purple
  ];

  const mainThemeOptions = [
    '#f4f4f4',  // Light
    '#1b1b1b'  // Dark
  ]

  const handleSidebarColorChange = (color) => {
    setSelectedColor(color);
    window.localStorage.setItem('sidebarColor', color)
    setShowSidebarOptions(false);
  };

  const handleMainColorChange = (color) => {
    setMainThemeColor(color);
    window.localStorage.setItem('mainTheme', color === '#f4f4f4' ? 'light' : 'dark')
    setShowMainThemeOptions(false);
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
            <div className='color-picker'
              style={{
                backgroundColor: selectedColor,
              }}
              onClick={() => {
                setShowMainThemeOptions(false)
                setShowSidebarOptions(!showSidebarOptions)
              }}
            ></div>
            {/* Color Picker - Dashboard */}
            <div className='color-picker'
              style={{
                backgroundColor: mainThemeColor,
              }}
              onClick={() => {
                setShowSidebarOptions(false)
                setShowMainThemeOptions(!showMainThemeOptions)
              }}
            ></div>
          </div>
          {/* Color Options - Sidebar */}
          {showSidebarOptions && (
            <div style={{ marginTop: '10px' }}>
              {sidebarColorOptions.map((color, index) => (
                <button
                  className='color-options'
                  key={index}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? '2px solid #000000' : 'none',
                  }}
                  onClick={() => handleSidebarColorChange(color)}
                ></button>
              ))}
            </div>
          )}

          {/* Color Options - Dashboard */}
          {showMainThemeOptions && (
            <div style={{ marginTop: '10px' }}>
              {mainThemeOptions.map((color, index) => (
                <button
                  className='color-options'
                  key={index}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? '2px solid #000000' : 'none',
                  }}
                  onClick={() => handleMainColorChange(color)}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
