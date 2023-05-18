import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Navbar.css'
import Pulse from '../assets/taskPulse.svg'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          {/* Icon by <a href="https://freeicons.io/profile/5790">ColourCreatype</a> on <a href="https://freeicons.io">freeicons.io</a> */}
          <img src={Pulse} className='logo-img' alt="pulse logo" />
          <span>TaskPulse</span>
        </li>

        {!user && (
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </>
        )}

        {user && (
          <li>
            {!isPending && <button onClick={logout} className='btn'>Logout</button>}
            {isPending && <button className='btn' disabled>Logging Out...</button>}
          </li>
        )}
      </ul>
    </div>
  )
}
