import { useCollection } from '../hooks/useCollection'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
  const { documents, error } = useCollection('users')
  const { mainThemeColor } = useAuthContext()

  return (
    <div className={`user-list ${mainThemeColor === '#1b1b1b' ? 'dark' : ''}`}>
      <h2>All Users</h2>
      {error && <div className='error'>{error}</div>}
      {documents && documents.map((user) => (
        <div key={user.id} className='user-list-item'>
          {user.online && <span className='online-user'></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  )
}
