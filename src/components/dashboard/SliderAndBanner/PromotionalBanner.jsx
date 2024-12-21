import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import CustomEditor from "../../../shared/CustomEditor/CustomEditor";

export default function PromotionalBanner() {
  // State variables for inputs
  const [headerText, setHeaderText] = useState("Don't Miss!!");
  const [titleText, setTitleText] = useState("Enhance Your Music Experience");
  const [description, setDescription] = useState("Description");
  const [timeStart, setTimeStart] = useState("2024-01-06 10:00:00");
  const [timeEnd, setTimeEnd] = useState("2024-01-10 23:00:00");
  const [buttonText, setButtonText] = useState("Check it Out");
  const [buttonLink, setButtonLink] = useState("#");
  const [loading, setLoading] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [isActive, setIsActive] = useState(false);

  const axiosSecure = useAxiosSecure();

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
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
      case "isActive":
        setIsActive(checked);
        break;
      default:
        break;
    }
  };

  const onSubmit = async () => {
    setLoading(true);

    const submitData = {
      headerText: headerText,
      titleText: titleText,
      description: description,
      timeStart: timeStart,
      timeEnd: timeEnd,
      buttonText: buttonText,
      buttonLink: buttonLink,
      isActive: isActive,
    };
    try {
      if (targetId) {
        const res = await axiosSecure.put(
          `/promo-banner/${targetId}`,
          submitData
        );
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Social updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const res = await axiosSecure.post(`/promo-banner`, submitData);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Social Created successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axiosSecure.get(`/promo-banner`);

        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data[0];

          console.log(data, "data");

          if (data) {
            setHeaderText(data?.headerText);
            setTitleText(data?.titleText);
            setDescription(data?.description);
            setTimeStart(data?.timeStart);
            setTimeEnd(data?.timeEnd);
            setButtonText(data?.buttonText);
            setButtonLink(data?.buttonLink);
            setIsActive(data?.isActive);
            setTargetId(data?._id);
          }
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

  console.log(description, "description");

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Form Section */}
        <div className="p-6 border-gray-300 border rounded-2xl">
          <h2 className="text-2xl font-semibold mb-7 flex justify-between items-center">
            Set Info for Promotional Banner
            <input
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={handleInputChange}
              className="checkbox checkbox-primary"
            />
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Heading Text</label>
            <input
              type="text"
              name="headerText"
              value={headerText}
              onChange={handleInputChange}
              className="customInput"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title Text</label>
            <input
              type="text"
              name="titleText"
              value={titleText}
              onChange={handleInputChange}
              className="customInput"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <CustomEditor
              name="description"
              value={description}
              setValue={setDescription}
              className="customInput resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time Start</label>
            <input
              type="datetime-local"
              name="timeStart"
              value={timeStart}
              onChange={handleInputChange}
              className="customInput"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time End</label>
            <input
              type="datetime-local"
              name="timeEnd"
              value={timeEnd}
              onChange={handleInputChange}
              className="customInput"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={buttonText}
              onChange={handleInputChange}
              className="customInput"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Button Link</label>
            <input
              type="url"
              name="buttonLink"
              value={buttonLink}
              onChange={handleInputChange}
              className="customInput"
            />
          </div>

          <button
            type="button"
            className="customSaveButton"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner mr-2  loading-xs"></span>
                Updating ..
              </>
            ) : (
              "Update info"
            )}
          </button>
        </div>

        {/* Preview Section */}
        <div className="p-4 border rounded-2xl">
          <h2 className="text-2xl font-semibold mb-9">Preview</h2>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-3xl mb-4 font-bold">{headerText}</h3>
            <p className="text-xl">{titleText}</p>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex justify-between items-center">
              <Link
                to={buttonLink}
                target="_blank"
                className="bg-pink-500 text-white px-4 py-2 rounded-2xl"
              >
                {buttonText}
              </Link>
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
