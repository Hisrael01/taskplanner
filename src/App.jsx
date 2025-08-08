import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import TaskPlanner from "./pages/Home"

export default function LandingPage() {

  return (
    <>
     <BrowserRouter>
        <Layout>
       <Routes>
          {/* Main Navigation Routes */}
          <Route path="/" element={<TaskPlanner/>} />
        </Routes>
            </Layout>
            </BrowserRouter>
    </>
  )
}
