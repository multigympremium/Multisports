import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../../../providers/AuthProvider";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useGetAllDistrict from "../../../../Hook/GetDataHook/useGetAllDistrict";

function AddDeliveryCharges({ setIsShowModal, isShowModal }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [districtName, setDistrictName] = useState("");
  const [subdistrictName, setSubdistrictName] = useState("");
  const [subdistricts, setSubdistricts] = useState([]);
  const [charge, setCharge] = useState("");

  const district = useGetAllDistrict({})




  const handleSubmit = async () => {


    try {
      const response = await axiosSecure.post(
        `/delivery-charge`,
        {
          district: districtName,
          subdistricts: subdistrictName,
          charge: charge,

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


        setDistrictName("");
        setSubdistrictName("");
        setCharge("");
        setSubdistricts([]);

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

  useEffect(() => {
    if (districtName === "") {
      setSubdistricts([]);
      return;
    }
    const subdistrictArray = district.find(district => district.district === districtName);
    setSubdistricts(subdistrictArray?.subdistricts);

  }, [district, districtName])



  return (
    <div className="bg-white p-5 mt-36  md:p-8 rounded-xl w-full" >
      <h3 className="text-2xl font-semibold mb-7 mt-3 text-nowrap">Add Question</h3>
      <div className="grid grid-cols-1 gap-4">

        <div>
          <label className="block  mb-1">District/City </label>
          <select
            name="district"
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
            className="select customInput"
          >
            <option value="">Select District</option>
            {district.length > 0 && district.map((item, index) => (
              <option key={index} value={item.district}>{item.district}</option>
            ))}
            {/* Add more options as necessary */}
          </select>

        </div>

        {/* Area/Thana/Upazilla */}
        <div>
          <label className="block  mb-1">Subdistrict </label>
          <select
            name="area"
            value={subdistrictName}
            onChange={(e) => setSubdistrictName(e.target.value)}
            className="select customInput"
          >
            <option value="">Select Area/Thana/Upazilla</option>
            {
              subdistricts?.length > 0 && subdistricts.map((subdistrict, index) => (
                <option key={index} value={subdistrict}>{subdistrict}</option>
              ))
            }
            {/* Add more options as necessary */}
          </select>

        </div>
        <div className="w-full ">
          <label className="block  mb-1">Charge </label>
          <input type="number" name="charge" id="charge" value={charge} onChange={(e) => setCharge(e.target.value)} className="customInput" />

        </div>

      </div>
      <div className="flex justify-end mt-9">
        <button className="customSaveButton w-full" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddDeliveryCharges;
