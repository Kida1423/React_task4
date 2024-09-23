import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import List from './components/List'
function App() {
  const [musicNumber, setMusicNumber] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  return (
    <main>
      <Card musicNumber={musicNumber} setMusicNumber={setMusicNumber} setOpen={setOpen}/>
      <List open={open} setOpen={setOpen} musicNumber={musicNumber} setMusicNumber={setMusicNumber} />
    </main>
    
  )
} 

export default App
