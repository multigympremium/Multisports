"use client";
import { useState } from "react";

export default function SendSMS() {
  const [sendingType, setSendingType] = useState("Everyone");
  const [customerContactNo, setCustomerContactNo] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [smsDescription, setSmsDescription] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [maxOrderValue, setMaxOrderValue] = useState("");
  const [message, setMessage] = useState("");

  // Example of templates (these can be fetched from an API)
  const smsTemplates = [
    { id: 1, title: "Welcome SMS", description: "Welcome to our platform!" },
    {
      id: 2,
      title: "Order Confirmation",
      description: "Your order has been confirmed.",
    },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating the SMS sending process
    const smsData = {
      sendingType,
      customerContactNo,
      selectedTemplate,
      smsDescription,
      customerType,
      minOrder,
      maxOrder,
      minOrderValue,
      maxOrderValue,
    };

    console.log("Sending SMS with data:", smsData);
    setMessage("SMS Sent Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Send SMS</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Sending Type */}
            <div>
              <label className="block font-bold mb-2">Sending Type *</label>
              <select
                value={sendingType}
                onChange={(e) => setSendingType(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="Everyone">Everyone</option>
                <option value="Specific Customer">Specific Customer</option>
              </select>
            </div>

            {/* Customer Contact No */}
            {sendingType === "Specific Customer" && (
              <div>
                <label className="block font-bold mb-2">
                  Customer Contact No
                </label>
                <input
                  type="text"
                  value={customerContactNo}
                  onChange={(e) => setCustomerContactNo(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Customer Contact No"
                  required
                />
              </div>
            )}

            {/* Select SMS Template */}
            <div>
              <label className="block font-bold mb-2">
                Select SMS Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => {
                  setSelectedTemplate(e.target.value);
                  const selected = smsTemplates.find(
                    (t) => t.id === parseInt(e.target.value)
                  );
                  setSmsDescription(selected ? selected.description : "");
                }}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select One</option>
                {smsTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.title}
                  </option>
                ))}
              </select>
            </div>

            {/* SMS Template Description */}
            <div>
              <label className="block font-bold mb-2">
                SMS Template Description *
              </label>
              <textarea
                value={smsDescription}
                onChange={(e) => setSmsDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="3"
                placeholder="Write SMS Here"
                required
              />
            </div>

            {/* SMS Sending Criteria */}
            <div className="col-span-2">
              <h2 className="font-bold text-lg mb-3">
                SMS Sending Criteria (Optional)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Select Customer Type */}
                <div>
                  <label className="block font-bold mb-2">
                    Select Customer Type
                  </label>
                  <select
                    value={customerType}
                    onChange={(e) => setCustomerType(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select One</option>
                    <option value="New">New Customer</option>
                    <option value="Returning">Returning Customer</option>
                  </select>
                </div>

                {/* Min. Order */}
                <div>
                  <label className="block font-bold mb-2">
                    Min. Order (Optional)
                  </label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g. 20"
                  />
                </div>

                {/* Max. Order */}
                <div>
                  <label className="block font-bold mb-2">
                    Max. Order (Optional)
                  </label>
                  <input
                    type="number"
                    value={maxOrder}
                    onChange={(e) => setMaxOrder(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g. 100"
                  />
                </div>

                {/* Minimum Order Value */}
                <div>
                  <label className="block font-bold mb-2">
                    Minimum Order Value (Optional)
                  </label>
                  <input
                    type="number"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g. 1000"
                  />
                </div>

                {/* Maximum Order Value */}
                <div>
                  <label className="block font-bold mb-2">
                    Maximum Order Value (Optional)
                  </label>
                  <input
                    type="number"
                    value={maxOrderValue}
                    onChange={(e) => setMaxOrderValue(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g. 10000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Send SMS Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white mt-5 py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Send SMS
          </button>

          {/* Success/Info Message */}
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
