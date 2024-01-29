import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiSupport, BiMailSend, BiPhoneCall } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 order-md-1">
            <img
              src="/images/contactus.jpeg"
              alt="Contact Us"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 order-md-2">
            <h2>Contact Us</h2>
            <p className='text-justify mt-2'>
              Any query and info about product feel free to call anytime we 24/7 vaialible
            </p>
            <p className='mt-3'>
              <BiMailSend /> : www.hahuyvu975@watchshop.com
            </p>
            <p className='mt-3'>
              <BiPhoneCall /> : 0901 356 975
            </p>
            <p className='mt-3'>
              <BiSupport /> : 1800-356-975 (toll free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact

