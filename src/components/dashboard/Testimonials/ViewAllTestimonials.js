"use client";
import BgBlurModal from "@/components/shared/Modal/BgBlurModal";
import useGetAllTestimonials from "@/Hook/GetDataHook/useGetAllTestimonials";
import Image from "next/image";
import { useState } from "react";
import EditTestimonialsForm from "./EditTestimonialsForm";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import DeleteCloudImage from "@/config/DeleteCloudImage/DeleteCloudImage";
import CellImage from "@/components/shared/ImageComponents/CellImage";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";


export default function ViewAllTestimonials() {
  // Testimonials data
  // const [testimonials, setTestimonials] = useState([
  //   {
  //     id: 1,
  //     image: "/user1.jpg", // Use actual image paths
  //     customer: "Nike Mardson",
  //     designation: "Web Developer",
  //     rating: 5,
  //     testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
  //   },
  //   {
  //     id: 2,
  //     image: "/user2.jpg",
  //     customer: "Selina Gomez",
  //     designation: "Software Engineer",
  //     rating: 4,
  //     testimonial: "Expedita in recusandae sit officia...",
  //   },
  //   {
  //     id: 3,
  //     image: "/user3.jpg",
  //     customer: "Hilary Duff",
  //     designation: "Founder & CEO",
  //     rating: 4,
  //     testimonial: "Labore voluptatem qui est aliquid...",
  //   },
  //   // Add more testimonials here as needed
  // ]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const testimonials = useGetAllTestimonials({ isShowModal, isDeleted });

  const axiosSecure = useAxiosSecure();

  // Change to how many you want to display per page

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [loading  , setLoading] = useState(false);

  // Get current items (testimonials)
  const currentTestimonials =
    testimonials?.length > 0 &&
    testimonials.filter((testimonial) =>
      testimonial?.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleEdit = (id) => {
    setTargetId(id);
    setIsShowModal(true);
  };

  const handleDelete = async ({ id, file_key }) => {
    console.log(file_key, "file_key", id);
    try {
      Swal.fire({
        title: "Are you sure you want to delete this member?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.delete(`/testimonials/${id}`);
            console.log(res, "res");
            if (res.status === 200 || res.status === 201) {
              if (file_key) {
                DeleteCloudImage({ key: file_key });
              }
              setIsDeleted((prev) => !prev);

              toast.success("Brand deleted successfully!");
            }
          } catch (error) {
            console.log(error, "error");
            toast.error("Error deleting user!");
          }
        }
      });
    } catch (error) {
      console.log(error, "error");
      toast.error("Error deleting brand!");
    }
    console.log(`Delete brand with ID: ${id}`);
  };

  return (
    <div className="container mx-auto py-3">
      <h1 className="text-2xl font-semibold mb-6">Testimonials</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="globalInput"
        />
      </div>

      {/* Testimonials Table */}
      <div className="overflow-x-auto">
        <div className="border rounded-xl py-1">
          <table className="min-w-full bg-white border-gray-300">
            <thead className="">
              <tr className="text-left border-b">
                <td className="p-2 pl-4">SL</td>
                <td className="p-2">Image</td>
                <td className="p-2">Customer</td>
                <td className="p-2">Designation</td>
                <td className="p-2">Rating</td>
                <td className="p-2">Action</td>
              </tr>
            </thead>
            <tbody>
              {currentTestimonials.length > 0 ? (
                currentTestimonials.map((testimonial, index) => (
                  <tr key={testimonial.id} className="">
                    <td className="p-2 pl-5">{index + 1}</td>
                    <td className="p-2">
                      {
                        testimonial?.image ? (
                          <CellImage
                            width={400}
                            height={400}
                            src={testimonial.image}
                            alt={testimonial.customerName}
                            loading="lazy"
                          />
                        ) : (
                          <div className="py-6 px-3">
                            <span className="loading loading-spinner text-gray-400 loading-sm"></span>
                          </div>
                        )
                      }
                    </td>

                    <td className="p-2">{testimonial?.customerName}</td>
                    <td className="p-2">{testimonial?.designation}</td>
                    <td className="p-2">
                      {"★".repeat(testimonial?.rating)}{" "}
                      {"☆".repeat(5 - testimonial?.rating)}
                    </td>
                    <td className="p-2">
                      <button
                        className="text-blue-500 text-xl"
                        onClick={() => handleEdit(testimonial._id)}
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        className="text-red-500 ml-4"
                        onClick={() =>
                          handleDelete({
                            id: testimonial?._id,
                            file_key: testimonial?.key,
                          })
                        }
                      >
                        <AiOutlineDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-32">
                    No testimonials available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <EditTestimonialsForm
          testimonialId={targetId}
          isShow={isShowModal}
          setIsShow={setIsShowModal}
        />
      </BgBlurModal>
    </div>
  );
}
