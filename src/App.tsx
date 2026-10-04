import './App.css'
import ArenaWithBull from './components/ArenaWithBull.js'
import { Matador } from './components/Matador.js'

function App() {
  return (
    <div className="App">
      <ArenaWithBull
        matador={<Matador />} />
    </div>
  )
}

export default App
