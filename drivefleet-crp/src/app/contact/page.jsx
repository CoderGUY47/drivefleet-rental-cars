"use client";

import { useState } from "react";
import { TextField, Label, Input, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    /* simulate sending message */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thank you! Your message has been sent successfully.");
    e.currentTarget.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 relative overflow-hidden">
      {/* decorative gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 italic">
            Contact Us
          </h1>
          <p className="text-base text-gray-400">
            Have questions about our premium vehicle fleet, custom rentals, or corporate partnerships? Let us know, and we'll get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* contact details card */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-8 space-y-8 backdrop-blur-md">
            <h3 className="text-xl font-bold uppercase tracking-wider text-orange-500 border-b border-white/10 pb-4">
              Contact Details
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-orange-500/20 text-orange-500 border border-orange-500/30">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Our Location</h4>
                  <p className="text-sm text-gray-400 mt-1">Mirpur DOHS, Road 4, House 12<br />Dhaka 1216, Bangladesh</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-orange-500/20 text-orange-500 border border-orange-500/30">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Call Us</h4>
                  <p className="text-sm text-gray-400 mt-1">+880 1712-345678</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-orange-500/20 text-orange-500 border border-orange-500/30">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Email Us</h4>
                  <p className="text-sm text-gray-400 mt-1">hello@drivefleet.com.bd<br />support@drivefleet.com.bd</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-orange-500/20 text-orange-500 border border-orange-500/30">
                  <FiClock className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Working Hours</h4>
                  <p className="text-sm text-gray-400 mt-1">Sat – Thu, 9:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* contact form card */}
          <div className="lg:col-span-8 bg-[#0c0c0c] border border-white/10 p-8 md:p-10 relative">
            <div className="h-1 w-full bg-orange-500 absolute top-0 left-0" />
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 italic">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField name="name" isRequired className="w-full">
                  <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Name
                  </Label>
                  <Input
                    name="name"
                    placeholder="Enter your name"
                    suppressHydrationWarning
                    className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                  />
                </TextField>

                <TextField name="email" type="email" isRequired className="w-full">
                  <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Email
                  </Label>
                  <Input
                    name="email"
                    placeholder="Enter your email"
                    suppressHydrationWarning
                    className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                  />
                </TextField>
              </div>

              <TextField name="subject" isRequired className="w-full">
                <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Subject
                </Label>
                <Input
                  name="subject"
                  placeholder="Enter message subject"
                  suppressHydrationWarning
                  className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                />
              </TextField>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Type your message here..."
                  className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full hover:opacity-90 text-black font-bold uppercase tracking-widest py-4 rounded-none transition-colors mt-2 text-sm bg-orange-500 flex items-center justify-center gap-2"
              >
                <FiSend />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
