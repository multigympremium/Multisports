
import "react-quill/dist/quill.snow.css";
import {lazy, Suspense} from "react"

const ReactQuill = lazy(() => import("react-quill"), { ssr: false });

const CustomEditor = ({ value, setValue }) => {
  return (
    <Suspense fallback={<div>Loading...</div>} >

    <div className="w-full mb-4">
      <ReactQuill
        value={value}
        onChange={setValue}
        style={{ height: "300px", marginBottom: "20px" }}
      />
    </div>
    </Suspense>
  );
};

export default CustomEditor;
