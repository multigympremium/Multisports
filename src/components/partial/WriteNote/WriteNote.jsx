
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useAuth } from "../../../providers/AuthProvider";

function WriteNote({ setIsShow, isShow , targetId, noteData}) {
  const [text, setText] = useState(noteData || "")
  const {branch} = useAuth();

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosSecure.put(`/users/put/${targetId}?branch=${branch}`, {notes: text});
      if (response?.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Note added successfully!",
          confirmButtonText: "OK",
        })
        setIsShow(false);
        setText("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Request failed!",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(()=> {
    if(isShow){
      setText(noteData)
    }
  }, [isShow, noteData])
  return (
    <article
      className={`w-full md:w-[65%] lg:w-[50%] rounded-xl bg-white my-7 transition-all duration-500 ${isShow ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
    >
      <h2 className="px-5 py-1  border-b border-gray-300 my-1 font-semibold">
        Write a note
      </h2>
      <form className="px-5 py-3" onSubmit={onSubmit}>
        <textarea
        value={text}
        onChange={(e)=> setText(e.target.value)}
        id="advance"
        placeholder="he is a good person ..."
        className="w-full resize-none p-5 rounded-xl min-h-[300px] mb-4 border outline-none border-gray-300 focus:border-gray-300"
        />

        <div className="flex justify-end items-center gap-3">

          <div
            className="flex gap-3 cursor-pointer items-center hover:bg-gray-700 hover:text-white py-1 px-3 rounded-xl  border hover:border-transparent  text-gray-700  border-gray-300 transition duration-300"
          >
            <button
              onClick={() => setIsShow(false)}
              type="button"
              className="font-semibold"
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-3 cursor-pointer  items-center bg-gray-700 text-white py-1 px-3 rounded-xl shadow hover:bg-transparent hover:text-gray-800 hover:border border hover:border-gray-300 hover:shadow-none transition duration-300">
            <button
              type="submit"
              className="font-semibold"

            >
              Save
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}

export default WriteNote;
