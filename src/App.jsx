import './App.css'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import AuthSection from './components/Authsection'
import EndpointsTable from './components/Endpointstable'

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Sidebar />
      <main style={{ marginLeft: 260, flex: 1, maxWidth: 900, padding: '64px 56px' }}>
        <Hero />
        <AuthSection />
        <EndpointsTable />
      </main>
    </div>
  )
}

export default App