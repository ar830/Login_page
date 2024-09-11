import React, { useState } from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";

Modal.setAppElement('#root'); // Set the app element for accessibility

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [dob, setDob] = useState(new Date());
  const [dobError, setDobError] = useState("");
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Open modal
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleDateChange = (date) => {
    setDob(date);
    setDobError("");

    if (date > new Date()) {
      setDobError("Date of Birth should be in the past");
      return;
    }

    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (date > eighteenYearsAgo) {
      setDobError("You must be at least 18 years old");
    }
  };

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  

  return (
    <>
      <div className="main">
        <h1>Sign Up Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              minLength={3}
              maxLength={20}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              minLength={3}
              maxLength={20}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth:</label>
            <DatePicker
              selected={dob}
              onChange={(date) => handleDateChange(date)}
              required
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={new Date()}
              minDate={new Date("1900-01-01")}
            />
            {dobError && <p className="error">{dobError}</p>}
          </div>

          <div className="form-group">
            <label>Enter Your Email ID:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={15}
              maxLength={20}
              required
            />
            {error && <p className="error">{error}</p>}
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              minLength={8}
              maxLength={10}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                let passwordError = "";

                if (e.target.value.length < 8) {
                  passwordError = "Password must be at least 8 characters long";
                } else if (!/[A-Z]/.test(e.target.value)) {
                  passwordError =
                    "Password must contain at least one uppercase letter";
                } else if (!/[0-9]/.test(e.target.value)) {
                  passwordError =
                    "Password must contain at least one numeric value";
                } else if (!/[!@#$%^&*]/.test(e.target.value)) {
                  passwordError =
                    "Password must contain at least one special character";
                }
                setPasswordError(passwordError);
              }}
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              minLength={8}
              maxLength={30}
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                let confirmPasswordError = "";

                if (e.target.value !== password) {
                  confirmPasswordError = "Passwords do not match";
                } else if (!/[A-Z]/.test(e.target.value)) {
                  confirmPasswordError =
                    "Password must contain at least one uppercase letter";
                } else if (!/[0-9]/.test(e.target.value)) {
                  confirmPasswordError =
                    "Password must contain at least one numeric value";
                } else if (!/[!@#$%^&*]/.test(e.target.value)) {
                  confirmPasswordError =
                    "Password must contain at least one special character";
                }
                setConfirmPasswordError(confirmPasswordError);
              }}
            />
            {confirmPasswordError && (
              <p className="error">{confirmPasswordError}</p>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Your Information"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Your Information</h2>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Mobile Number:</strong> {mobile}</p>
        <p><strong>Date of Birth:</strong> {dob.toDateString()}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}

export default App;
