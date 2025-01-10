import { IoIosSearch } from "react-icons/io";
import { useTypewriter } from "react-simple-typewriter";

export default function SearchArea({
  setIsFocused,
  setIsShowSearch,
  placeholders,
  isFocused,
}) {
  const [text] = useTypewriter({
    words: placeholders,
    loop: true,
    cursor: true,
    cursorStyle: "|",
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  const handleFocus = () => {
    // setIsFocused(true);
    setIsShowSearch(true);
  };

  const handleBlur = (e) => {
    if (e.target.value.length === 0) {
      setIsFocused(false);
    }
  };

  return (
    // <Typewriter
    //   words={placeholders}
    //   loop={5}
    //   cursor
    //   cursorStyle="_"
    //   typeSpeed={70}
    //   deleteSpeed={50}
    //   delaySpeed={1000}
    // />
    <div className="bg-gray-100 rounded-full px-3 w-[70%] md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
      <input
        type="text"
        className="outline-none w-full bg-gray-100"
        placeholder={!isFocused ? `Search for ${text}` : ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="search"
        name="search"
      />
      <IoIosSearch className="text-2xl text-gray-400" />
    </div>
  );
}
