import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout>
      <div className='row aboutus'>
        <div className='col-md-6 mt-5 d-flex align-items-center'>
          <img
            src='/images/aboutus.jpeg'
            alt='aboutus'
            style={{ width: "90%", margin: "auto"}}
          />
        </div>
        <div className='col-md-6 d-flex align-items-center'>

          <p className='text-center'>
            Welcome to Watch Shop, where time meets elegance. We are passionate about bringing you a curated collection of exquisite timepieces that blend precision with style.

            At Watch Shop, we believe that a watch is more than just a timekeeping device; it's a reflection of one's personality and a symbol of timeless sophistication. Our mission is to provide you with a unique selection of watches that not only tell time but also tell your story.
          </p>


        </div>
      </div>
    </Layout>
  )
}

export default About;