import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'

function App() {

  return (
    <>
      <div className=" d-flex flex-column min-vh-100">
        {/* <Navbar /> */}

        <main className={"flex-fill"}>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>

        {/* <footer className="mt-auto w-100">
          <Footer/>
      </footer> */}
      </div>
    </>
  )
}

export default App
