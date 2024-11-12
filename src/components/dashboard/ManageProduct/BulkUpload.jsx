"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle file drop using react-dropzone
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setMessage("");
  };

  // Parsing the Excel file
  const handleFileUpload = () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);

      setMessage("Products uploaded successfully!");
    };
    reader.readAsArrayBuffer(file);
  };

  // react-dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Upload Products from Excel</h1>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Side Image */}
          <div className="flex items-center justify-center">
            <img
              width={400}
              height={400}
              src="/images/excel-upload-illustration.svg"
              alt="Excel Upload"
              className="w-full h-auto"
            />
          </div>

          {/* Right Side Instructions and File Upload */}
          <div>
            <p className="mb-4">
              You can upload products using Excel files, but the format of the
              Excel file must match our sample file below. It is better to use
              our demo Excel file, fill in the data, and upload it to our
              system.
            </p>
            <a
              href="/demo/products.xlsx"
              download
              className="text-blue-500 underline"
            >
              Demo Excel File: products.xlsx
            </a>

            {/* File Dropzone */}
            <div
              {...getRootProps()}
              className="mt-4 p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {file ? (
                <p>{file.name}</p>
              ) : (
                <p>Drag & drop an Excel file here, or click to browse</p>
              )}
            </div>

            {/* Upload Button */}
            <button
              type="button"
              onClick={handleFileUpload}
              className="bg-teal-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-teal-700"
            >
              Upload Products
            </button>

            {/* Message */}
            {message && <p className="mt-4 text-green-500">{message}</p>}

            <p className="mt-2 text-gray-500">
              Please be patient. Uploading products may take a few minutes
              depending on the volume of data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
