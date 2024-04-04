import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StripePaymentForm from '../../Components/Stripe/StripePaymentForm';
import "./BookingDetails.css";

const BookingDetails = () => {


  // State variables to hold form data
  const [formData, setFormData] = useState({
    primaryTraveler: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
    },
    additionalTravelers: [],
    cardName: '',
    cardType: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress1: '',
    billingAddress2: '',
    city: '',
    state: '',
    zipCode: '',
    agreeToTerms: false,
  });
  const [formValid, setFormValid] = useState(false);
  const [showAdditionalForm ,setShowAdditionalForm] = useState(false);

  // Handler for form input changes
  const handleInputChange = (e, travelerIndex = null) => {
    console.log('e', e);
    const { name, value } = e.target;

    setFormData({...formData,  [name]: value})
    // if (travelerIndex !== null) {
    //   const additionalTravelers = [...formData.additionalTravelers];
    //   additionalTravelers[travelerIndex][name] = value;
    //   setFormData(prevState => ({
    //     ...prevState,
    //     additionalTravelers: additionalTravelers,
    //     cardNumber: '911'
    //   }));
    // } else {
    //   setFormData(prevState => ({
    //     ...prevState,
    //     primaryTraveler: {
    //       ...prevState.primaryTraveler,
    //       [name]: value,
    //       cardNumber: '911',
    //     },
    //   }));
    // }

    console.log(formData)
  };

  // Handler for checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  // Handler for adding additional traveler
  const handleAddTraveler = () => {
    const additionalTravelers = [...formData.additionalTravelers, {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
    }];
    setFormData(prevState => ({
      ...prevState,
      additionalTravelers: additionalTravelers,
    }));
    setShowAdditionalForm(true);
    console.log("Add additional traveler");
  };

  // Function to handle input changes for additional travelers
  const handleAdditionalInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      additionalTravelers: prevState.additionalTravelers.map((traveler, i) =>
        i === index ? { ...traveler, [name]: value } : traveler
      ),
    }));
  };

  // Function to check form validity
  const checkFormValidity = () => {
    const inputs = [
      formData.primaryTraveler.firstName,
      formData.primaryTraveler.lastName,
      formData.cardName,
      formData.cardType,
      formData.cardNumber,
      formData.expirationDate,
      formData.cvv,
      formData.billingAddress1,
      formData.city,
      formData.state,
      formData.zipCode,
    ];

    return inputs.every(input => input.trim() !== '');
  };

  // Update form validity state whenever form data changes
  useEffect(() => {
    setFormValid(checkFormValidity());
  }, [formData]);


  return (
    <div className='bookingDetails-main'>
      <div className="bookingDetails-container">
        <div className="bookingDetails-title-container">
          <h1 className="details-heading">Booking Details</h1>
        </div>
        <div className='custom-details-container'>
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
            <h2 className='summary-heading'>Payment Details</h2>
            <form onSubmit={handleSubmit} autoComplete="false">
              <legend><h3 className='form-heading'>Contact Information</h3></legend>
              <div className='name-container'>
                <label htmlFor="firstName">First Name</label>
                <input className='booking-name'
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="middleName">Middle Name</label>
                <input className='booking-name'
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input className='booking-name'
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
                <label className='gender-heading'>Gender</label>
                <div className='gender-container'>
                  <input className='gender'
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="male">Male</label>
                  <input className='gender'
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <label className='dob-heading'>Date of Birth</label>
                <div className='dob-container'>
                <select className='dob' name="birthMonth" value={formData.birthMonth} onChange={(e) => handleAdditionalInputChange(e, index)} required>
                  <option value="/">Month</option>
                  {Array.from({length: 12}, (_, index) => {
                      const month = index + 1;
                      return <option key={month} value={month}>{month}</option>;
                  })}
                 </select>
                  <select className='dob' name="birthDay" value={formData.birthDay} onChange={handleInputChange} required>
                    <option value="/">Day</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <select className='dob' name="birthYear" value={formData.birthYear} onChange={(e) => handleAdditionalInputChange(e, index)} required>
                    <option value="/">Year</option>
                    {Array.from({length: 100}, (_, index) => {
                    const year = 1924 + index;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
              {/* Additional traveler form */}
              {formData.additionalTravelers.map((traveler, index) => (
                <div key={index} className='additional-traveler-form'> 
                  <legend><h3 className='form-heading'>Additional Traveler {index + 1}</h3></legend>
                  <div className='name-container'>
                    <label htmlFor={`additionalFirstName-${index}`}>First Name</label>
                    <input className='booking-name'
                      type="text"
                      id={`additionalFirstName-${index}`}
                      name={`additionalFirstName-${index}`}
                      value={traveler.firstName}
                      onChange={(e) => handleAdditionalInputChange(e, index)}
                      required
                    />
                    <label htmlFor={`additionalMiddleName-${index}`}>Middle Name</label>
                    <input className='booking-name'
                      type="text"
                      id={`additionalMiddleName-${index}`}
                      name={`additionalMiddleName-${index}`}
                      value={traveler.middleName}
                      onChange={(e) => handleAdditionalInputChange(e, index)}
                    />
                    <label htmlFor={`additionalLastName-${index}`}>Last Name</label>
                    <input className='booking-name'
                      type="text"
                      id={`additionalLastName-${index}`}
                      name={`additionalLastName-${index}`}
                      value={traveler.lastName}
                      onChange={(e) => handleAdditionalInputChange(e, index)}
                      required
                    />
                  </div>
                {/* Gender radio buttons */}
                    <label className='gender-heading'>Gender</label>
                    <div className='gender-container'>
                      <input className='gender'
                        type="radio"
                        id={`additionalMale-${index}`}
                        name={`additionalGender-${index}`}
                        value={traveler.male}
                        checked={traveler.gender === "male"}
                        onChange={(e) => handleAdditionalInputChange(e, index)}
                      />
                      <label htmlFor={`additionalFemale-${index}`}>Male</label>
                      <input className='gender'
                        type="radio"
                        id={`additionalfemale-${index}`}
                        name={`additionalGender-${index}`}
                        value={traveler.female}
                        checked={traveler.gender === "female"}
                        onChange={(e) => handleAdditionalInputChange(e, index)}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                {/* Date of birth selects */}
                  <div className='dob-container'>
                  <select className='dob' name="birthMonth" value={traveler.birthMonth} onChange={(e) => handleAdditionalInputChange(e, index)} required>
                    <option value="/">Month</option>
                    {Array.from({length: 12}, (_, index) => {
                        const month = index + 1;
                        return <option key={month} value={month}>{month}</option>;
                    })}
                  </select>
                    <select className='dob' name="birthDay" value={traveler.birthDay} onChange={(e) => handleAdditionalInputChange(e, index)} required>
                      <option value="/">Day</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                    <select className='dob' name="birthYear" value={traveler.birthYear} onChange={(e) => handleAdditionalInputChange(e, index)} required>
                      <option value="/">Year</option>
                      {Array.from({length: 100}, (_, index) => {
                      const year = 1924 + index;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                </div>
              ))}
              <div className='button-container'>
                <button className="booking-button" onClick={handleAddTraveler}>Add Traveler</button>
              </div>
              {/* Payment Information section */}
              <div>
                <StripePaymentForm />
              </div>

              <legend><h3 className='form-heading'>Terms and Conditions Agreement</h3></legend>
              <div className='tc-container'>
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
              </div>
              <legend><h3 className='form-heading'>Cancellation Policy</h3></legend>
              <div className='policy-container'>
                <p>The cancellation policy for this booking is as follows:</p>
                <ol>
                  <li><strong>Free Cancellation:</strong> We offer free cancellation within a specified timeframe. Check your booking confirmation for details.</li>
                  <li><strong>Non-Refundable Bookings:</strong> Some bookings are non-refundable and will be charged in full upon reservation.</li>
                  <li><strong>Refundable Bookings:</strong> Cancellations within a specified period are eligible for a refund, subject to cancellation fees.</li>
                  <li><strong>Cancellation Fees:</strong> Fees may apply based on timing and booking type. Refer to your confirmation for details.</li>
                  <li><strong>Last-Minute Cancellations:</strong> Cancellations within 24-48 hours may incur additional fees.</li>
                  <li><strong>Modifications:</strong> Changes to bookings may be subject to availability and charges.</li>
                  <li><strong>Force Majeure:</strong> We accommodate cancellations due to unforeseen events, subject to partner policies.</li>
                  <li><strong>Refund Processing:</strong> Refunds are processed within 7-14 business days.</li>
                  <li><strong>Contact Us:</strong> For assistance, reach out to our customer support team.</li>
                </ol>
                <p>Refer to your booking terms for specific details.</p>
              </div>
              <div className='button-container'>
                <Link to={'/confirmation'} className='booking-button' type="submit" disabled={!formValid}>Just Book It!!</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;