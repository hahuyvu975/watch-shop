import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - Watch Shop"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 order-md-1">
            <img
              src="/images/aboutus.jpeg"
              alt="About Us"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 order-md-2">
            <h2>About Us</h2>
            <p>
              Watch Shop is more than just a timepiece retailer; we are curators of elegance and sophistication. Established with a passion for blending precision with style, our goal is to offer a meticulously curated collection of exquisite timepieces that transcend mere functionality.
            </p>
            <p>
              At Watch Shop, we believe that a watch is more than a device that tells time; it is an expression of one's individuality and a symbol of timeless sophistication. Our mission is to provide you with a unique selection of watches that not only keep you on schedule but also tell your unique story.
            </p>
            <p>
              As a destination for watch enthusiasts, Watch Shop is committed to delivering not just products but experiences. Our knowledgeable and passionate team is dedicated to assisting you in finding the watch that resonates with your style and complements your personality.
            </p>
            <p>
              Welcome to Watch Shop, where every tick is a testament to your individuality and a celebration of timeless elegance
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About;