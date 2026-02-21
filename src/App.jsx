import './App.css'
import Sidebar from './components/docs/Sidebar'
import Hero from './components/docs/Hero'
import AuthSection from './components/docs/Authsection'
import EndpointsTable from './components/docs/Endpointstable'
import Taskssection from './components/docs/Taskssection'
import Errorssection from './components/docs/Errorssection'

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Sidebar />
      <main style={{ marginLeft: 260, flex: 1, maxWidth: 900, padding: '64px 56px' }}>
        <Hero />
        <AuthSection />
        <EndpointsTable />
        <Taskssection/>
        <Errorssection />
      </main>
    </div>
  )
}

export default App