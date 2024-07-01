import './App.css'

import LayOut from './LayOut/LayOut'
import { NavMenubottom } from './components/nav/navMenu'
import ChatBoxMessages from './components/popup/ChatBoxMessages'
import ShowAddPost from './components/popup/showAddPost/ShowaAddPost'
import ShowMeteoDetails from './components/popup/showMeteoDetails/ShowMeteoDetails'

function App() {

  return (
    <>
      
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <LayOut />
      <div><ChatBoxMessages /></div>
      <div><ShowMeteoDetails /></div>
      <div><ShowAddPost /></div>
      <NavMenubottom />
      
    </>
  )
}

export default App
