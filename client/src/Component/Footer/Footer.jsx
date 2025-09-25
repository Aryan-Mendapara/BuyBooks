import React, { useContext, useState } from "react";
import { FaTruck, FaCreditCard, FaRegCheckCircle, FaWhatsapp, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const ServiceInfoBanner = () => {
  const {darkMode} = useContext(ThemeContext);

  const services = [
    {
      icon: <FaTruck className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl" />,
      title: "Pan India Delivery",
      description: "No Minimum Order Value",
    },
    {
      icon: <FaCreditCard className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl" />,
      title: "Secure Payment",
      description: "100% Secure Payment",
    },
    {
      icon: <FaRegCheckCircle className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl" />,
      title: "Business/Bulk orders",
      description: "Mail Us for Further Orders",
    },
    {
      icon: <FaWhatsapp className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl" />,
      title: "Quick Support",
      description: "10:00 AM - 5:00 PM (Sunday Closed)",
    },
  ];

  const info = [
    {
      icon: <FaLocationDot size={28} />,
      title: "Viraj Tower - 2, 4259/3, Ansari Road, Darya Ganj, New Delhi - 110002",
    },
    {
      icon: <FaWhatsapp size={28} />,
      title: " +91-8287084742 ",
    },
    {
      icon: <MdEmail size={28} />,
      title: "info@buybooksindia.com"
    }
  ];

  const socialIcons = [<FaFacebookF />, <FaTwitter />, <FaLinkedinIn />, <FaInstagram />];

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
      links: ["Indian Languages", "International Languages", "Award Winning Books", "Frontlist Picks Books", "Used Books", "Exams & Age"]
    }    
  ];

  const [email, setEmail] = useState("");

  return (
    <div className={`${darkMode ? 'bg-black/90 text-white' : 'bgwhite text-black'}`}>
      {/* Services Section */}
      <div className={`py-8 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border rounded-lg bg-white shadow hover:shadow-md transition"
            >
              {service.icon}
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-orange-600 text-white py-12 px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">SUBSCRIBE TO BUYBOOKSINDIA NEWSLETTER</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-80 md:w-96 p-2 rounded-l-md text-black focus:outline-none border border-gray-200"
          />
          <button className="bg-gray-200 text-orange-600 p-2 sm:px-4 rounded-r-md hover:bg-gray-300 transition">
            <LiaTelegramPlane size={26} />
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-[#1f2d3d] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-8 mb-6 text-center sm:text-left">
          {info.map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center sm:items-center gap-2 max-w-xs mx-auto"
            >
              <div className="mb-2">{item.icon}</div>
              <p className="text-sm sm:text-base">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 text-white text-lg mt-4">
          {socialIcons.map((icon, index) => (
            <span 
              key={index} 
              className="cursor-pointer hover:text-orange-500 transition"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-gray-300 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-800">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold border-b-2 border-orange-500 mb-3 text-xl sm:text-2xl">{section.title}</h4>
              <ul className="space-y-1 text-sm sm:text-base">
                {section.links.map((link, i) => (
                  <li 
                    key={i} 
                    className="hover:text-orange-500 cursor-pointer transition"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black text-white py-3 px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
        <span className="text-sm sm:text-base mb-2 sm:mb-0">© 2025 - All rights reserved by Swets Information Service Pvt Ltd.</span>
        <span className="text-sm sm:text-base">Powered by: Prints Publications Pvt Ltd</span>
      </div>
    </div>
  );
};

export default ServiceInfoBanner;
