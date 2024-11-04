import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CustomEditor = ({ value, setValue }) => {
  return (
    <div className="w-full mb-4">
      <ReactQuill
        value={value}
        onChange={setValue}
        style={{ height: "300px", marginBottom: "20px" }}
      />
    </div>
  );
};

export default CustomEditor;
