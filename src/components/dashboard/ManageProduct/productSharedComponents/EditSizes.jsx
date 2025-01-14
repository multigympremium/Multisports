import { IoCloseCircleOutline } from "react-icons/io5";
import ReactSelect from "../../../UI/ReactSelect";
import InputSizeQuantity from "./InputSizeQuantity";
import { useEffect, useState } from "react";
import InputSizeEditQuantity from "./InputSizeEditQuantity";
import { color } from "framer-motion";

export default function EditSizes({
  productSizes,
  editingSize,
  deleteSize,
  groupStyles,
  groupBadgeStyles,
  setEditingSize,
  totalQuantity,
  setAllSizesQuantity,
  allSizesQuantity,
  setEditingQuantity,
  setTotalQuantity,
  colorAndSize,
  editingIndex,
  isSizeFocus,
  setQuantity,
  editingQuantity,
  setColorAndSize,
  stock,
}) {
  console.log(editingSize, "editingSize", totalQuantity, "totalQuantity");
  //   const [existingSizes, setEditingSize] = useState([]);

  //   useEffect(() => {
  //     console.log(
  //       colorAndSize[editingIndex]?.size,
  //       //   "colorAndSize[editingIndex]",
  //       editingIndex,
  //       colorAndSize,
  //       colorAndSize?.length > 0 && editingIndex
  //     );
  //     if (colorAndSize?.length > 0 && isSizeFocus) {
  //       setEditingSize(colorAndSize[editingIndex]?.size);
  //       //   setEditingSize(["asdf"]);
  //     }
  //   }, [editingIndex, colorAndSize, isSizeFocus]);

  useEffect(() => {
    if (isSizeFocus) {
      let itemsTotalQuantity = colorAndSize.reduce((acc, curr) => {
        return Number(acc) + Number(curr.quantity);
      }, 0);

      const editingSizeTotalQuantity = editingSize.reduce((acc, curr) => {
        return Number(acc) + Number(curr.quantity);
      }, 0);
      console.log(itemsTotalQuantity, editingSize, "item.quantity all");

      // !isEditing && setParentQuantity(itemsTotalQuantity);

      setColorAndSize((prev) => {
        prev[editingIndex].quantity = editingSizeTotalQuantity;
        itemsTotalQuantity = prev.reduce((acc, curr) => {
          return Number(acc) + Number(curr.quantity);
        }, 0);
        return prev;
      });

      setAllSizesQuantity(Number(itemsTotalQuantity));
      setEditingQuantity(editingSizeTotalQuantity);
    }
  }, [
    setAllSizesQuantity,
    editingSize,
    setColorAndSize,
    setEditingQuantity,
    isSizeFocus,
  ]);

  return (
    <div>
      <div className="flex gap-4">
        <div className="w-full">
          <ReactSelect
            options={productSizes.map((item) => {
              return {
                value: item.sizeName,
                label: item.sizeName,
              };
            })}
            formatGroupLabel={(data) => (
              <div
                style={groupStyles}
                key={data.sizeName}
                onClick={() => {
                  // setProductSizeValue(data);
                  console.log(data, "size");
                }}
              >
                <span>{data.sizeName}</span>
                <span style={groupBadgeStyles}>{data.options.length}</span>
              </div>
            )}
            selectOption={editingSize}
            onChange={(data) => {
              setEditingSize((prev) => {
                //   console.log([...editingSize, data], "prev");
                data.quantity = 0;

                return prev?.length > 0
                  ? Array.from(
                      new Set([...prev, data].map((obj) => JSON.stringify(obj)))
                    ).map((str) => JSON.parse(str))
                  : [data];
              });
            }}
          />
        </div>
        <span className="text-xs text-gray-500 mt-2 border rounded-lg border-gray-300 px-2 py-1 text-center  flex gap-2 font-bold bg-green-300 h-full">
          {/* {totalQuantity -
            editingSize?.reduce((acc, curr) => acc + curr.quantity, 0)} */}
          {stock - allSizesQuantity}
          <b>Left</b>
        </span>
      </div>

      <ul className="flex gap-3 mt-3 items-center h-[100px]">
        {editingSize?.length > 0 &&
          editingSize.map((item, index) => (
            <li
              key={index}
              className="px-3 py-1 border border-black text-sm capitalize relative rounded-lg"
            >
              {item?.label}
              <InputSizeEditQuantity
                setEditingSize={setEditingSize}
                item={item}
                setParentQuantity={setQuantity}
                totalQuantity={totalQuantity}
                setAllSizesQuantity={setAllSizesQuantity}
                allSizesQuantity={allSizesQuantity}
                setEditingQuantity={setEditingQuantity}
                editingQuantity={editingQuantity}
                editingSize={editingSize}
                setTotalQuantity={setTotalQuantity}
                stock={stock}
              />
              <span
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 "
                onClick={() => deleteSize(index, "edit")}
              >
                <IoCloseCircleOutline size={25} />
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
