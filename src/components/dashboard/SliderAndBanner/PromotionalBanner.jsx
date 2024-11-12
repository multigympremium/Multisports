import { useState } from "react";

export default function PromotionalBanner() {
  // State variables for inputs
  const [headerText, setHeaderText] = useState("Don't Miss!!");
  const [titleText, setTitleText] = useState("Enhance Your Music Experience");
  const [description, setDescription] = useState("Description");
  const [timeStart, setTimeStart] = useState("2024-01-06 10:00:00");
  const [timeEnd, setTimeEnd] = useState("2024-01-10 23:00:00");
  const [buttonText, setButtonText] = useState("Check it Out");
  const [buttonLink, setButtonLink] = useState("#");

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "headerText":
        setHeaderText(value);
        break;
      case "titleText":
        setTitleText(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "timeStart":
        setTimeStart(value);
        break;
      case "timeEnd":
        setTimeEnd(value);
        break;
      case "buttonText":
        setButtonText(value);
        break;
      case "buttonLink":
        setButtonLink(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Form Section */}
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">
            Set Info for Promotional Banner
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Heading Text</label>
            <input
              type="text"
              name="headerText"
              value={headerText}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title Text</label>
            <input
              type="text"
              name="titleText"
              value={titleText}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time Start</label>
            <input
              type="datetime-local"
              name="timeStart"
              value={timeStart}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time End</label>
            <input
              type="datetime-local"
              name="timeEnd"
              value={timeEnd}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={buttonText}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Button Link</label>
            <input
              type="url"
              name="buttonLink"
              value={buttonLink}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-3xl font-bold">{headerText}</h3>
            <p className="text-xl">{titleText}</p>
            <p className="mb-4">{description}</p>
            <div className="flex justify-between items-center">
              <button className="bg-pink-500 text-white px-4 py-2 rounded">
                {buttonText}
              </button>
              <div className="text-gray-700">
                <p>Starts: {new Date(timeStart).toLocaleString()}</p>
                <p>Ends: {new Date(timeEnd).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
