import { useState } from 'react';
import "./BookingDetails.css";

const BookingDetails = () => {

    // State variables to hold form data
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      cardType: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      billingAddress: '',
      promoCode: '',
      agreeToTerms: false,
    });
  
    // Handler for form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Handler for checkbox change
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData({
        ...formData,
        [name]: checked,
      });
    };
  
    // Handler for form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log(formData);
    };

  return (
    <div className="bookingDetails-container">
      <div className="title-container">
        <h1 className="details-heading">Booking Details</h1>
      </div>
      <div className="booking-summary">
        <h2 className="summary-heading">Trip Summary</h2>
        <div className="card-container">
          <div className="flight-summary-card">
            <h3 className="card-heading">Flights</h3>
            <p>Seattle to New York City</p>
            <p>Departure Date: April 10, 2024</p>
            <p>New York City to Seattle</p>
            <p>Return Date Date: April 18, 2024</p>
          </div>
          <div className="hotel-summary-card">
            <h3 className="card-heading">Stay</h3>
            <p>Aloft New York Brooklyn</p>
            <p>Check In Date: April 11, 2024</p>
            <p>Check Out Date: April 18, 2024</p>
          </div>
        </div>
        <div className="cost-summary">
          <h3 className="card-heading">Cost</h3>
          <div className='cost-card'>
            <p className='cost-info'>Total</p>
            <p className='cost-info'>$2,880</p>
          </div>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Contact Information</legend>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="address">Mailing Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            ></textarea>
          </fieldset>

          <fieldset>
            <legend>Payment Information</legend>
            <label htmlFor="cardType">Credit Card Type:</label>
            <select
              id="cardType"
              name="cardType"
              value={formData.cardType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Card Type</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
            </select>
            <label htmlFor="cardNumber">Credit Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              pattern="\d{4}-?\d{4}-?\d{4}-?\d{4}"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              required
            />
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
              placeholder="MM/YY"
              required
            />
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              pattern="\d{3}"
              placeholder="123"
              required
            />
            <label htmlFor="billingAddress">Billing Address:</label>
            <textarea
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              required
            ></textarea>
          </fieldset>

          <fieldset>
            <legend>Promo Code</legend>
            <label htmlFor="promoCode">Promo Code:</label>
            <input
              type="text"
              id="promoCode"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset>
            <legend>Terms and Conditions Agreement</legend>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="agreeToTerms">
              I agree to the terms and conditions of booking.
            </label>
          </fieldset>

          <fieldset>
            <legend>Cancellation Policy</legend>
            <p>The cancellation policy for this booking is as follows:</p>
            <ol>
                <li><strong>Free Cancellation:</strong>We offer free cancellation within a specifiied timeframe. Check your booking confirmation for details.</li>
                <li><strong>Non-Refundable Bookings:</strong>Some bookings are non-refunable and will be charged in full upon reservation.</li>
                <li><strong>Refundable Bookings:</strong>Cancellations within a specified period are eligible for a refund, subject to cancellation fees.</li>
                <li><strong>Cancellation Fees:</strong>Fees may apply based on timing and booking type. Refer to your confirmation for details.</li>
                <li><strong>Last-Minute Cancellations:</strong>Cancellations within 24-48 hours may incur additional fees.</li>
                <li><strong>Modifications:</strong>Changes to bookings may be subject to availability and charges.</li>
                <li><strong>Force Majeure:</strong>We accommodate cancellations due to unforeseen events, subject to partner policies.</li>
                <li><strong>Refund Processing:</strong>Refunds are processed within 7-14 business days.</li>
                <li><strong>Contact Us:</strong>For assistance, reach out to our customer support team.</li>
            </ol>
            <p>Refer to your booking terms for specific details.</p>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BookingDetails;
