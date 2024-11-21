"use client";
// pages/system-users.js
import { useState } from "react";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import SystemUserRegistration from "../MemberRegistration/SystemUserRegistration";
import useGetAllSystemUsers from "../../../Hook/GetDataHook/useGetAllSystemUsers";

export default function SystemUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Sample data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rana Khan",
      email: "bdsohaq578@gmail.com",
      phone: "01839950240",
      address: "43/3 Abdul Haihid Rd., Jamtola, New Chashara",
      accountCreated: "2024-02-28 09:08:01 pm",
      userType: "SuperAdmin",
    },
    {
      id: 2,
      name: "Himel",
      email: "himel.acca@gmail.com",
      phone: "+8801670535004",
      address: "43/3 Abdul Haihid Rd., Jamtola, New Chashara",
      accountCreated: "2024-02-17 02:32:26 pm",
      userType: "Admin",
    },
    {
      id: 3,
      name: "Barry Young",
      email: "feby.tanot@mailinator.com",
      phone: "+1 (603) 244-6779",
      address: "Deserunt modi veniam",
      accountCreated: "2024-01-30 08:58:11 pm",
      userType: "User",
    },
  ]);

  const systemUsers = useGetAllSystemUsers({});

  // Toggle Admin or SuperAdmin status
  const toggleAdminStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              userType: user.userType === "SuperAdmin" ? "User" : "SuperAdmin",
            }
          : user
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">System Users List</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
          + Add New User
        </button>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">SL</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">User Type</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {systemUsers?.length > 0 && systemUsers.map((user, index) => (
            <tr key={user.id} className="border-b">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.contact_no}</td>
              <td className="p-2 border">{user.address}</td>
              <td className="p-2 border">
                {user.role}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleAdminStatus(user.id)}
                  className={`${
                    user.userType === "SuperAdmin"
                      ? "bg-red-500"
                      : "bg-green-500"
                  } hover:${
                    user.userType === "SuperAdmin"
                      ? "bg-red-600"
                      : "bg-green-600"
                  } text-white px-2 py-1 rounded mr-2`}
                >
                  {user.userType === "SuperAdmin"
                    ? "Revoke SuperAdmin"
                    : "Make SuperAdmin"}
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <BgBlurModal isShowModal={isModalOpen} setIsShowModal={setIsModalOpen}>
        <SystemUserRegistration isShow={isModalOpen} setIsShow={setIsModalOpen} />
      </BgBlurModal>
    </div>
  );
}
