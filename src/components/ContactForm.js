import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Grazie per il tuo messaggio! Ti contatteremo presto.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Il tuo nome"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="La tua email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Come possiamo aiutarti?"
          rows="5"
          value={formData.message}
          onChange={handleInputChange}
          required
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <button type="submit" className="contact-submit-btn">
        Invia Messaggio
      </button>
    </form>
  );
};

export default ContactForm;
