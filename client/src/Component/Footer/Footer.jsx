import React, { useState } from "react";
import { FaTruck, FaCreditCard, FaRegCheckCircle, FaWhatsapp, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


const ServiceInfoBanner = () => {
  const services = [
    {
      icon: <FaTruck size={60} className="text-orange-500 text-3xl" />,
      title: "Pan India Delivery",
      description: "No Minimum Order Value",
    },
    {
      icon: <FaCreditCard size={60} className="text-orange-500 text-3xl" />,
      title: "Secure Payment",
      description: "100% Secure Payment",
    },
    {
      icon: <FaRegCheckCircle size={60} className="text-orange-500 text-3xl" />,
      title: "Business/Bulk orders",
      description: "Mail Us for Further Orders",
    },
    {
      icon: <FaWhatsapp size={60} className="text-orange-500 text-3xl" />,
      title: "Quick Support",
      description: "10:00 AM - 5:00 PM (Sunday Closed)",
    },
  ];

  const info = [
    {
      icon: <FaLocationDot size={30} />,
      title: "Viraj Tower - 2, 4259/3, Ansari Road, Darya Ganj, New Delhi - 110002",
    },
    {
      icon: <FaWhatsapp size={30} />,
      title: " +91-8287084742 ",
    },
    {
      icon: <MdEmail size={30} />,
      title: "info@buybooksindia.com"
    }
  ];

  const socialIcons = [
    <FaFacebookF />,
    <FaTwitter />,
    <FaLinkedinIn />,
    <FaInstagram />,
  ];

  const footerSections = [
    {
      title: "COMPANY",
      links: ["About Us", "Publisher Partnership", "Contact Us", "Privacy Policy", "Disclaimer"]
    },
    {
      title: "MY ACCOUNT",
      links: ["My Orders", "My Addresses", "My Personal Info"]
    },
    {
      title: "SUPPORT",
      links: ["Terms of Use", "How to Order", "Shipping Policy", "Return Policy"]
    },
    {
      title: "MORE BOOKS",
      links: ["Indian Languages", 
              "International Languages", 
              "Award Winning Books" , 
              "Frontlist Picks Books", 
              "Used Books", 
              "Exams & Age"]
    }    
  ]

  const [email, setEmail] = useState("")

  return (
    <div>
      {/* Services */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border rounded-md bg-white shadow-sm">
              {service.icon}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-orange-600 text-white text-center w-full h-122 py-20">
        <div>
          <h1 className="text-5xl">SUBSCRIBE TO BUYBOOKSINDIA NEWSLETTER</h1>
        </div>
        <div className="relative py-2 flex items-center justify-center mt-4">
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 w-[28rem] p-2"
          />
          <button
          // onClick={}
          >
            <LiaTelegramPlane size={30} className="-ml-[2.5rem] relative" />
          </button>
        </div>

        {/* Contact Info */}
        <div className="bg-[#1f2d3d] text-white py-8 w-full text-center mt-15">
          <div className="flex justify-center flex-wrap gap-14 mb-6">
            {info.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center max-w-sm text-sm px-4"
              >
                <div className="mb-5">{item.icon}</div>
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 text-white text-lg">
            {socialIcons.map((icon, index) => (
              <span key={index} className="cursor-pointer hover:text-orange-500">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-gray-300 py-9 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 text-gray-800">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold border-b-2 border-orange-500 mb-3 text-3xl inline-block">{section.title}</h4>
              <ul className="space-y-1 text-md">
                {section.links.map((link, i) => (
                  <li key={i}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black text-white py-2">
        <div className="flex justify-between text-xl">
          <h1 className="ml-20">
            © 2025 - All rights reserved by Swets Information Service pvt Ltd.
          </h1>
          <p className="flex items-end text-end mr-20">
            Powered by : Prints Publications Pvt Ltd
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoBanner;