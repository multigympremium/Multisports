import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div className=''>
            <div
                className="relative h-44 md:h-60 w-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://gamcaslip.com/wp-content/uploads/2022/05/gamca-medical-slip-contat-us.jpg')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
                    <h1 className="text-2xl md:text-8xl font-bold text-white md:mb-4">Contact Us</h1>
                    <p className="text-sm md:text-3xl tracking-widest text-gray-200">Don't hesitate to ask !</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-8 mt-5  w-[90%] md:max-w-[1440px] mx-auto">

                {/* Left Section */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                    <p className=" mb-6">
                        We look forward to hearing from you. Our support team is always ready to chat. We eagerly anticipate the opportunity to assist you and welcome any communication from your end.
                    </p>
                    <div className="mb-4">
                        <h3 className="text-xl mb-4 font-semibold ">Corporate Office</h3>
                        <p className="flex items-center ">
                            <FaMapMarkerAlt className="text-blue-500 mr-2" /> 24, 3 Tajmahal Rd, Dhaka 1207
                            info@multisports.com.bd
                        </p>
                        <p className="flex items-center  mt-2">
                            <FaPhoneAlt className="text-blue-500 mr-2" /> +88-01313-197426
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl mb-4 font-semibold ">Customer Service</h3>
                        <p className="flex items-center ">
                            <FaEnvelope className="text-blue-500 mr-2" /> support@multisports.com
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl mb-4 font-semibold ">Vendor Support</h3>
                        <p className="flex items-center ">
                            <FaEnvelope className="text-blue-500 mr-2" /> operation@multisports.com
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg border shadow">
                    <form className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="tel"
                                placeholder="Enter Your Phone Number"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Your Subject"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                        />
                        <textarea
                            placeholder="Write Your Message"
                            rows="4"
                            className="resize-none w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            SEND
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
