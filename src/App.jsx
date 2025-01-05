import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Note from './components/note/Note'
import Viewnote from './components/viewnotes/Viewnote'

const router = createBrowserRouter([
  
  {
    path: "/",
    element:
      <div>
        <Navbar />
        <Home />
      </div>
  },

  {
    path: "/notes",
    element:
      <div>
        <Navbar />
        <Note />
      </div>
  },

  {
    path: "/notes/:id",
    element:
      <div>
        <Navbar />
        <Viewnote />
      </div>
  },
  


])

function App() {

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
