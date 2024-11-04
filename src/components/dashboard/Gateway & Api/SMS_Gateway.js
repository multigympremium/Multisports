"use client";
import Image from "next/image";
import { useState } from "react";

export default function SmsGateways() {
  const [gateways, setGateways] = useState([
    {
      id: 1,
      name: "KhudeBarta",
      apiEndpoint: "http://192.168.18.119:8585/send",
      apiKey: "5d2a",
      secretKey: "465",
      senderID: "8801847",
      logo: "/images/khudebarta.png", // Replace with actual image path
      isActive: true,
    },
    {
      id: 2,
      name: "Reve SMS",
      apiEndpoint: "https://smpp.ajuratech.com:7790/sendtext",
      apiKey: "69eff06995ad485",
      secretKey: "20cdfd28",
      senderID: "GenericCommerceV1",
      logo: "/images/reve-sms.png", // Replace with actual image path
      isActive: false,
    },
    {
      id: 3,
      name: "ElitBuzz",
      apiEndpoint: "https://880sms.com/smsapi",
      apiKey: "C2009578bf436075.858353215",
      secretKey: "Don’t Need This for ElitBuzz",
      senderID: "GenericCommerceV1",
      logo: "/images/elitbuzz.png", // Replace with actual image path
      isActive: false,
    },
  ]);

  const handleToggle = (id) => {
    setGateways((prevGateways) =>
      prevGateways.map((gateway) =>
        gateway.id === id
          ? { ...gateway, isActive: !gateway.isActive }
          : { ...gateway, isActive: false }
      )
    );
  };

  const handleUpdate = (id, field, value) => {
    setGateways((prevGateways) =>
      prevGateways.map((gateway) =>
        gateway.id === id ? { ...gateway, [field]: value } : gateway
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">SMS Gateway Configuration</h1>

        <div className="grid grid-cols-3 gap-6">
          {gateways.map((gateway) => (
            <div
              key={gateway.id}
              className={`border-2 rounded-md p-6 ${
                gateway.isActive ? "border-green-500" : "border-gray-200"
              }`}
            >
              {/* Logo */}
              <div className="flex justify-between items-center">
                <Image
                  width={400}
                  height={400}
                  src={gateway.logo}
                  alt={gateway.name}
                  className="h-12"
                />
                <input
                  type="checkbox"
                  checked={gateway.isActive}
                  onChange={() => handleToggle(gateway.id)}
                  className="toggle-checkbox"
                />
              </div>

              {/* API Endpoint */}
              <div className="mt-4">
                <label className="block font-bold mb-2">API Endpoint</label>
                <input
                  type="text"
                  value={gateway.apiEndpoint}
                  onChange={(e) =>
                    handleUpdate(gateway.id, "apiEndpoint", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* API Key */}
              <div className="mt-4">
                <label className="block font-bold mb-2">API Key</label>
                <input
                  type="text"
                  value={gateway.apiKey}
                  onChange={(e) =>
                    handleUpdate(gateway.id, "apiKey", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Secret Key */}
              <div className="mt-4">
                <label className="block font-bold mb-2">Secret Key</label>
                <input
                  type="text"
                  value={gateway.secretKey}
                  onChange={(e) =>
                    handleUpdate(gateway.id, "secretKey", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Sender ID */}
              <div className="mt-4">
                <label className="block font-bold mb-2">Sender ID</label>
                <input
                  type="text"
                  value={gateway.senderID}
                  onChange={(e) =>
                    handleUpdate(gateway.id, "senderID", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Update Button */}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  onClick={() => alert(`Updated ${gateway.name} information!`)}
                >
                  Update Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
