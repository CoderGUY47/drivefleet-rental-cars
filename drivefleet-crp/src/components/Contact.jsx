"use client";

import AnimatedButton from "./AnimatedButton";
import { useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";

export default function Contact() {
  /* manage contact form input state values */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  /* track successful contact form submission state */
  const [isSubmitted, setIsSubmitted] = useState(false);
  /* track hover focus index of info cards */
  const [isHovered, setIsHovered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ fullName: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 4500);
  };

  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: "Our Headquarters",
      text: "Mirpur DOHS, Road 4, House 12\nDhaka 1216, Bangladesh", 
    },
    {
      icon: <FiPhone />,
      title: "Phone Number",
      text: "+880 1712-345678\nSat–Thu, 9am–7pm (BST, UTC+6)",
    },
    {
      icon: <FiMail />,
      title: "Email Address",
      text: "hello@drivefleet.com.bd\nsupport@drivefleet.com.bd",
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-gray-50 overflow-hidden">
      {/* decorative background shapes and gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* section title and subtitle intro text block */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="h-px w-8 bg-orange-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500">
              REACH OUT TO US
            </span>
            <span className="h-px w-8 bg-orange-500"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
              Touch.
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg pt-2">
            Whether you need a custom corporate fleet or have a question about
            our exclusive inventory, our concierge team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* left column showing direct contact details cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item, idx) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer border border-transparent hover:border-gray-100"
                  onMouseEnter={() => setIsHovered(idx)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div
                    className={`w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-500 ${isHovered === idx ? "bg-orange-500 text-white scale-110 shadow-lg shadow-orange-500/30" : "bg-gray-100 text-gray-700 group-hover:bg-orange-50"}`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 transition-colors group-hover:text-orange-500">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 leading-relaxed whitespace-pre-line group-hover:text-gray-600 transition-colors">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right column showing contact form or success card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 rounded-2xl relative overflow-hidden group">
              {/* form dynamic top accent gradient line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>

              {isSubmitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center gap-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-50 text-green-500 mb-2">
                    <FiCheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Message Sent
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto text-lg">
                      Thank you for reaching out. Our concierge team will
                      contact you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="peer w-full border-b-2 border-gray-200 bg-transparent px-0 py-3 text-gray-900 placeholder-transparent focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="Your Name"
                      />
                      <label
                        htmlFor="fullName"
                        className="absolute left-0 -top-3.5 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-500 uppercase tracking-wider"
                      >
                        Your Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="peer w-full border-b-2 border-gray-200 bg-transparent px-0 py-3 text-gray-900 placeholder-transparent focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="Your Email"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-500 uppercase tracking-wider"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="peer w-full border-b-2 border-gray-200 bg-transparent px-0 py-3 text-gray-900 placeholder-transparent focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Subject"
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-0 -top-3.5 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-500 uppercase tracking-wider"
                    >
                      Subject
                    </label>
                  </div>
                  <div className="relative pt-2">
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="peer w-full border-b-2 border-gray-200 bg-transparent px-0 py-3 text-gray-900 placeholder-transparent focus:border-orange-500 focus:outline-none transition-colors resize-none"
                      placeholder="Your Message..."
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 -top-3.5 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-500 uppercase tracking-wider"
                    >
                      Your Message
                    </label>
                  </div>
                  <div className="pt-2">
                    <AnimatedButton
                      type="submit"
                      icon={<FiSend />}
                      className="w-full md:w-auto"
                    >
                      Send Message
                    </AnimatedButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
