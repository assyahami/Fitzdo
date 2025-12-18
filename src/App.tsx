
import './App.css'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import { Toaster } from "sonner";
function App() {

  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={Router} />

    </>
  )
}

export default App
