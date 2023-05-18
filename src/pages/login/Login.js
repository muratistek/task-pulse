import { useEffect, useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error, setError, setIsPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (e.nativeEvent.target.id === "demo-btn") {
      login("test@gmail.com", "123456")
    }
    else {
      login(email, password)
    }
  }


  useEffect(() => {
    if (error) {
      setIsPending(false)
      setTimeout(() => setError(null), 3000)
    }
    // eslint-disable-next-line
  }, [error])

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <div className='btn-flex'>
        {!isPending ? <button className='btn'>Login</button> : <button disabled className='btn'>Loading</button>}
        <button className='btn-solid' type='button' id='demo-btn' onClick={handleSubmit}>Demo App</button>
      </div>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
