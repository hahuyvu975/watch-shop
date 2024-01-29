import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 order-md-1">
            <img
              src="/images/policy.jpeg"
              alt="Privacy Policy"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 order-md-2">
            <h2>Privacy Policy</h2>
            <p>
              When you visit our site, we may collect personal information, such as your name and email address, to enhance your experience.
            </p>
            <p>
              We use your information to personalize your browsing experience, process transactions, and provide updates on your orders.
            </p>
            <p>
              We take the security of your information seriously and implement measures to safeguard it.
            </p>
            <p>
              Our website uses cookies to improve user experience. You can choose to disable cookies through your browser settings.
            </p>
            <p>
              Our site may contain links to third-party websites. We are not responsible for their privacy practices.
            </p>
            <p>
              This Privacy Policy may be updated periodically. Check the last updated date for the latest information.

              Thank you for choosing www.watchshop.com . If you have any questions, contact us at hahuyvu975@watchshop.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Policy