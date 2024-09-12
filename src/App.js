import React, { useRef, useState } from "react";

function App() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const data = {
      from_name: formData.get("from_name"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      message: formData.get("message"),
    };

    fetch("http://localhost:5001/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setStatus("Email sent successfully!");
        } else {
          setStatus("Error sending email, debug more.");
        }
      })
      .catch((error) => {
        console.error(
          "error sending email:",
          error.response ? error.response.body : error.message
        );
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Contact Form</h2>
      <form ref={form} onSubmit={sendEmail} className="p-4 border rounded">
        <div className="mb-3">
          <label htmlFor="from_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="from_name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" name="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">
            Phone
          </label>
          <input type="tel" name="telephone" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            name="message"
            className="form-control"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-3 text-center">
          <input type="submit" value="Send" className="btn btn-primary" />
        </div>
        {status && <div className="alert alert-info text-center">{status}</div>}
      </form>
    </div>
  );
}

export default App;
