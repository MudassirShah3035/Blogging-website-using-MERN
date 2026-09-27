import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AllBlogs from '../components/AllBlogs'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>

      
        <section>
          <Hero />
        </section>


        <section>
          <AllBlogs />
        </section>

      <footer>
        <Footer />
      </footer>

    </div>
  )
}

export default Home
