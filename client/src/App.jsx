import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './component/Main/Main'
import Primary from './component/Primary'
import SignUp from './component/SignUp/SignUp'
import SignIn from './component/SignIn/SignIn'
import Chat from './component/Chat/Chat'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Primary />}>
      <Route path='/' element={<Main />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/chat' element={<Chat />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
