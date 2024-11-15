import { useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

function AddDistrict({ setIsShowModal, isShowModal }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [nameField, setNameField] = useState("");
  const [options, setOptions] = useState([]);
  const [optionField, setOptionField] = useState("");
 


 

  const handleSubmit = async () => {
    

    try {
      const response = await axiosSecure.post(
        `/district`,
        {
          district: nameField,
          subdistricts: options,
         
          branch: user?.branch || "shia",
        }
      );
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Payment method added successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setIsShowModal(false);

        
        setNameField("");
        setOptions([]);
        setOptionField("");
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        title: "Error",
        text: `Something went wrong`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleOptions = (e) => {
    e.preventDefault();
    setOptions((prev) => [...prev, optionField]);
    setOptionField("");
  }

  return (
    <div className="bg-white p-5  md:p-8 rounded-xl w-full" >
      <h3 className="text-2xl font-semibold mb-7 mt-3 text-nowrap">Add Question</h3>
      <div className="grid grid-cols-1 gap-4">
        
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-xl font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={nameField}
            onChange={(e) => setNameField(e.target.value)}
            className="outline-none border p-2 rounded-xl focus:border-gray-300"
          />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleOptions}> 
            <div className="flex flex-col gap-4">
              <label htmlFor="field_type" className="text-xl font-semibold">
                Options
              </label>
              <input
                type="text"
                name="options"
                id="options"
                value={optionField}
                onChange={(e) => setOptionField(e.target.value)}
                className="outline-none border p-2 rounded-xl focus:border-gray-300"
              />
            </div>
       

        <ol className="list-outside pl-4" style={{listStyle: "auto"}}>
          {options?.length > 0 && options.map((item, index) => (
            <li key={index} className="text-gray-500 border-b border-gray-300 py-2 px-4">
              <div className="flex items-center gap-2 justify-between">
              <span className="font-semibold">{item}</span>
              <span
                className="hover:bg-blue-100 text-white p-1 rounded bg-red-100"
                onClick={() => {
                  setOptionField("");
                  setOptions((prev) => {
                    const newOptions = prev.filter((opt) => opt !== item);
                    console.log("newOptions", newOptions);
                    return newOptions;
                    // return prev
                    });
                }}
              >
                <IoClose className="text-red-500 text-xl" />
              </span>

              </div>
            </li>
          ))}
        </ol>

        </form>
       
      </div>
      <button className="font-semibold bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg ml-auto block w-fit mt-12"  onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}

export default AddDistrict;
