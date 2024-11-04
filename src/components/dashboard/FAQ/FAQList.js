// pages/about.js
import { useState } from "react";

export default function FAQList() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Is my personal information secure?",
      answer:
        "We take the security and privacy of your personal information seriously...",
      status: "Active",
    },
    {
      id: 2,
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team by [insert contact information]...",
      status: "Active",
    },
    // Add all other FAQs here
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Vision Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Vision Section</h2>
        <form className="bg-white shadow-md rounded p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Vision Image</label>
            <input type="file" className="block w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Vision Section Title
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Our Vision"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Vision Description
            </label>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Write Vision Description Here"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Update Info
          </button>
        </form>
      </section>

      {/* Mission Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Mission Section</h2>
        <form className="bg-white shadow-md rounded p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Mission Image
            </label>
            <input type="file" className="block w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Mission Section Title
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Our Mission"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Mission Description
            </label>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Write Mission Description Here"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Update Info
          </button>
        </form>
      </section>

      {/* About Us Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">About Us Section</h2>
        <form className="bg-white shadow-md rounded p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Banner Background Image
            </label>
            <input type="file" className="block w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Sub Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Why Choose Us"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Section Title
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="We do not buy from the open market"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Enter description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Side Image</label>
            <input type="file" className="block w-full p-2 border rounded" />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Update Info
          </button>
        </form>
      </section>

      {/* FAQ List Section */}
      <section>
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">FAQ List</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Add New FAQ
          </button>
        </div>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Question</th>
              <th className="p-2 border">Answer</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, index) => (
              <tr key={faq.id} className="border-b">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{faq.question}</td>
                <td className="p-2 border">{faq.answer}</td>
                <td className="p-2 border">{faq.status}</td>
                <td className="p-2 border">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
