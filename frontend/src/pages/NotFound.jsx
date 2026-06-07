import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

function NotFound() {
  const navigate = useNavigate()

  return (
    navigate('/')
  )
}

export default NotFound