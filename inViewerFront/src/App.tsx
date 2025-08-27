import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginForm } from './Components/LoginForm'
import { Protected } from './Components/Protected'
import { RegisterForm } from './Components/RegisterForm'
import { AskForCode } from './Components/sendCode'
import { VerifyCode } from './Components/VerifyCode'
import { ResetPassword } from './Components/ResetPassword'
import { AskForEmailCode } from './Components/sendRegisterCode'
import { VerifyRegisterCode } from './Components/VerifyRegisterCode'
import { Dashboard } from './Components/Dashboard.tsx'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/receiveCode' element={<AskForCode />} />
          <Route path='/verifyCode' element={<VerifyCode />} />
          <Route path='/setPassword' element={<ResetPassword />} />
          <Route path='/dashboard/*'  element={
            <Protected>
              <Dashboard />
            </Protected>}
            />
            <Route path='/receiveEmailCode' element={<AskForEmailCode />} />
          <Route path='/verifyEmailCode' element={<VerifyRegisterCode />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme='system' />
    </>
  )
}

export default App
