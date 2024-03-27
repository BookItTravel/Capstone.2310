import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                  <select className='dob' name="birthMonth" value={formData.birthMonth} onChange={handleInputChange} required>
                    <option value="/">Month</option>
                    <option value="january">Jan</option>
                    <option value="february">Feb</option>
                    <option value="march">Mar</option>
                    <option value="april">Apr</option>
                    <option value="may">May</option>
                    <option value="june">Jun</option>
                    <option value="july">Jul</option>
                    <option value="august">Aug</option>
                    <option value="september">Sep</option>
                    <option value="october">Oct</option>
                    <option value="november">Nov</option>
                    <option value="december">Dec</option>
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
                  <select className='dob' name="birthYear" value={formData.birthYear} onChange={handleInputChange} required>
                    <option value="/">Year</option>
                    <option value="1924">1924</option>
                    <option value="1925">1925</option>
                    <option value="1926">1926</option>
                    <option value="1927">1927</option>
                    <option value="1928">1928</option>
                    <option value="1929">1929</option>
                    <option value="1930">1930</option>
                    <option value="1931">1931</option>
                    <option value="1932">1932</option>
                    <option value="1933">1933</option>
                    <option value="1934">1934</option>
                    <option value="1935">1935</option>
                    <option value="1936">1936</option>
                    <option value="1937">1937</option>
                    <option value="1938">1938</option>
                    <option value="1939">1939</option>
                    <option value="1940">1940</option>
                    <option value="1941">1941</option>
                    <option value="1942">1942</option>
                    <option value="1943">1943</option>
                    <option value="1944">1944</option>
                    <option value="1945">1945</option>
                    <option value="1946">1946</option>
                    <option value="1947">1947</option>
                    <option value="1948">1948</option>
                    <option value="1949">1949</option>
                    <option value="1950">1950</option>
                    <option value="1951">1951</option>
                    <option value="1952">1952</option>
                    <option value="1953">1953</option>
                    <option value="1954">1954</option>
                    <option value="1955">1955</option>
                    <option value="1956">1956</option>
                    <option value="1957">1957</option>
                    <option value="1958">1958</option>
                    <option value="1959">1959</option>
                    <option value="1960">1960</option>
                    <option value="1961">1961</option>
                    <option value="1962">1962</option>
                    <option value="1963">1963</option>
                    <option value="1964">1964</option>
                    <option value="1965">1965</option>
                    <option value="1966">1966</option>
                    <option value="1967">1967</option>
                    <option value="1968">1968</option>
                    <option value="1969">1969</option>
                    <option value="1970">1970</option>
                    <option value="1971">1971</option>
                    <option value="1972">1972</option>
                    <option value="1973">1973</option>
                    <option value="1974">1974</option>
                    <option value="1975">1975</option>
                    <option value="1976">1976</option>
                    <option value="1977">1977</option>
                    <option value="1978">1978</option>
                    <option value="1979">1979</option>
                    <option value="1980">1980</option>
                    <option value="1981">1981</option>
                    <option value="1982">1982</option>
                    <option value="1983">1983</option>
                    <option value="1984">1984</option>
                    <option value="1985">1985</option>
                    <option value="1986">1986</option>
                    <option value="1987">1987</option>
                    <option value="1988">1988</option>
                    <option value="1989">1989</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1992">1992</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
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
                      <option value="january">Jan</option>
                      <option value="february">Feb</option>
                      <option value="march">Mar</option>
                      <option value="april">Apr</option>
                      <option value="may">May</option>
                      <option value="june">Jun</option>
                      <option value="july">Jul</option>
                      <option value="august">Aug</option>
                      <option value="september">Sep</option>
                      <option value="october">Oct</option>
                      <option value="november">Nov</option>
                      <option value="december">Dec</option>
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
                      <option value="1924">1924</option>
                      <option value="1925">1925</option>
                      <option value="1926">1926</option>
                      <option value="1927">1927</option>
                      <option value="1928">1928</option>
                      <option value="1929">1929</option>
                      <option value="1930">1930</option>
                      <option value="1931">1931</option>
                      <option value="1932">1932</option>
                      <option value="1933">1933</option>
                      <option value="1934">1934</option>
                      <option value="1935">1935</option>
                      <option value="1936">1936</option>
                      <option value="1937">1937</option>
                      <option value="1938">1938</option>
                      <option value="1939">1939</option>
                      <option value="1940">1940</option>
                      <option value="1941">1941</option>
                      <option value="1942">1942</option>
                      <option value="1943">1943</option>
                      <option value="1944">1944</option>
                      <option value="1945">1945</option>
                      <option value="1946">1946</option>
                      <option value="1947">1947</option>
                      <option value="1948">1948</option>
                      <option value="1949">1949</option>
                      <option value="1950">1950</option>
                      <option value="1951">1951</option>
                      <option value="1952">1952</option>
                      <option value="1953">1953</option>
                      <option value="1954">1954</option>
                      <option value="1955">1955</option>
                      <option value="1956">1956</option>
                      <option value="1957">1957</option>
                      <option value="1958">1958</option>
                      <option value="1959">1959</option>
                      <option value="1960">1960</option>
                      <option value="1961">1961</option>
                      <option value="1962">1962</option>
                      <option value="1963">1963</option>
                      <option value="1964">1964</option>
                      <option value="1965">1965</option>
                      <option value="1966">1966</option>
                      <option value="1967">1967</option>
                      <option value="1968">1968</option>
                      <option value="1969">1969</option>
                      <option value="1970">1970</option>
                      <option value="1971">1971</option>
                      <option value="1972">1972</option>
                      <option value="1973">1973</option>
                      <option value="1974">1974</option>
                      <option value="1975">1975</option>
                      <option value="1976">1976</option>
                      <option value="1977">1977</option>
                      <option value="1978">1978</option>
                      <option value="1979">1979</option>
                      <option value="1980">1980</option>
                      <option value="1981">1981</option>
                      <option value="1982">1982</option>
                      <option value="1983">1983</option>
                      <option value="1984">1984</option>
                      <option value="1985">1985</option>
                      <option value="1986">1986</option>
                      <option value="1987">1987</option>
                      <option value="1988">1988</option>
                      <option value="1989">1989</option>
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className='button-container'>
                <button className="booking-button" onClick={handleAddTraveler}>Add Traveler</button>
              </div>
              {/* Payment Information section */}
              <legend><h3 className='form-heading'>Payment Information</h3></legend>
              <div className='payment-container'>
                <label htmlFor="cardName">Name on Card</label>
                <input className='longInput'
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
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
                <label htmlFor="cardNumber">Credit Card Number</label>
                <input className='mediumInput' autoComplete='new-password'
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                value={formData.cardNumber}
                  onChange={handleInputChange}
                  pattern="\d{4}-?\d{4}-?\d{4}-?\d{4}"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  required
                />
                <label htmlFor="expirationDate">Expiration Date</label>
                <input className='shortInput'
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                  placeholder="MM/YY"
                  required
                />
                <label htmlFor="cvv">CVV</label>
                <input className='shortInput'
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  pattern="\d{3}"
                  placeholder="123"
                  required
                />
                {/* Break up billing address */}
                <label htmlFor="billingAddress1">Billing Address 1</label>
                <input className='longInput'
                  type="text"
                  id="billingAddress1"
                  name="billingAddress1"
                  value={formData.billingAddress1}
                  onChange={handleInputChange}
                  placeholder="1234 Main St"
                  required
                />
                <label htmlFor="billingAddress2">Billing Address 2</label>
                <input className='longInput'
                  type="text"
                  id="billingAddress2"
                  name="billingAddress2"
                  value={formData.billingAddress2}
                  onChange={handleInputChange}
                  placeholder="Apt/Suite"
                />
                <label htmlFor="city">City</label>
                <input className='mediumInput' 
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
                <label htmlFor="state">State</label>
                <input className='stateInput'
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                />
                <label htmlFor="zipCode">Zip Code</label>
                <input className='shortInput'
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                  required
                />
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