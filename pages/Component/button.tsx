import { useState } from "react";

function Button() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-gray-500", "bg-indigo-500", "bg-orange-500", "bg-teal-500"];

  const handleClick = () => {
    setColorIndex((colorIndex + 1) % colors.length);
  };

  return (
    <button className={`rounded p-4 ${colors[colorIndex]}`} onClick={handleClick}>
      Click me
    </button>
  );
}

export default Button;
