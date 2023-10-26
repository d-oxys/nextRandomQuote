import { useState, useEffect } from "react";
import { Html, Head, Main, NextScript } from "next/document";
import "animate.css";
interface Quote {
  text: string;
  author: string;
}

export default function quotes() {
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });
  const [colorIndex, setColorIndex] = useState(0);
  const [BgcolorIndex, setBgColorIndex] = useState(0);
  const colors = ["text-blue-700", "text-red-700", "text-green-700", "text-yellow-700", "text-purple-700", "text-pink-700", "text-gray-700", "text-indigo-700", "text-orange-700", "text-teal-700"];
  const Bgcolors = ["bg-blue-700", "bg-red-700", "bg-green-700", "bg-yellow-700", "bg-purple-700", "bg-pink-700", "bg-gray-700", "bg-indigo-700", "bg-orange-700", "bg-teal-700"];

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response: Response) => response.json())
      .then((data: Quote[]) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  const handleClick = () => {
    setColorIndex((colorIndex + 1) % colors.length);
    setBgColorIndex((BgcolorIndex + 1) % Bgcolors.length);
    fetch("https://type.fit/api/quotes")
      .then((response: Response) => response.json())
      .then((data: Quote[]) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className={`flex h-screen w-screen items-center justify-center transition ease-in-out ${Bgcolors[BgcolorIndex]}`}>
        <div className="relative">
          <div className="block max-w-xl rounded-lg border border-gray-200 bg-white p-8 shadow">
            <h5 className={`${colors[colorIndex]} animate__animated animate__fadeIn animate__delay-1s my-4 font-sans text-2xl font-bold tracking-tight transition ease-in-out`}>"{quote.text}"</h5>
            <p className={`mx-2 text-end font-semibold ${colors[colorIndex]} animate__animated animate__fadeIn animate__delay-1s transition ease-in-out`}>- {quote.author}</p>
            <div className="flex justify-end">
              <button
                onClick={handleClick}
                className="group relative my-5 mx-2 mb-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400"
              >
                <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">Next Quote</span>
              </button>
            </div>
          </div>
          <h1 className="mt-5 text-center font-sans text-sm font-bold text-white">By doxys</h1>
        </div>
      </div>
    </>
  );
}
