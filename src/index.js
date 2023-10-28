import "../src/style.css";
const template = document.createElement("template");

template.innerHTML = `
  <style>
  #quote {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0; /* my-4 dalam format rem */
    font-family: sans-serif;
    color: #4299e1; /* Sesuaikan warna dengan keinginan Anda */
    letter-spacing: 0.05em; /* tracking-tight */
    transition: all 0.5s; /* transition ease-in-out */
  }
  
  #author {
    margin: 0.5rem 2rem; /* mx-2 dalam format rem */
    text-align: right; /* text-end */
    font-weight: 600; /* font-semibold */
    color: #4299e1; /* Sesuaikan warna dengan keinginan Anda */
    transition: all 0.5s; /* transition ease-in-out */
  }
  
  #nextQuoteButton {
    font-weight: bold;
    background-image: linear-gradient(to bottom right, #ff0072, #ff9900);
    color: #1a202c;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.5s;
  }
  
  #nextQuoteButton:hover {
    background-image: linear-gradient(to bottom right, #ff0072, #ff9900);
    color: #fff;
  }
  </style>
  <div id="quote-box">
    <div id="quote"></div>
    <div id="author"></div>
    <button id="nextQuoteButton">Next Quote</button>
  </div>
`;

class QuoteBox extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.quoteElement = this.shadowRoot.querySelector("#quote");
    this.authorElement = this.shadowRoot.querySelector("#author");
    this.nextQuoteButton = this.shadowRoot.querySelector("#nextQuoteButton");

    this.nextQuoteButton.addEventListener("click", this.getNextQuote.bind(this));
    this.getNextQuote();
  }

  getNextQuote = async () => {
    const bgColors = ["bg-blue-700", "bg-red-700", "bg-green-700", "bg-yellow-700", "bg-purple-700", "bg-pink-700", "bg-gray-700", "bg-indigo-700", "bg-orange-700", "bg-teal-700"];
    const textColors = ["text-blue-700", "text-red-700", "text-green-700", "text-yellow-700", "text-purple-700", "text-pink-700", "text-gray-700", "text-indigo-700", "text-orange-700", "text-teal-700"];

    const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    const randomTextColor = textColors[Math.floor(Math.random() * textColors.length)];

    const bodyElement = document.getElementById("body");
    if (bodyElement) {
      bodyElement.className = `flex h-screen w-screen items-center justify-center ${randomBgColor}`;
    }

    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      this.quoteElement.textContent = `"${randomQuote.text}"`;
      this.authorElement.textContent = `- ${randomQuote.author}`;
    } catch (error) {
      console.error(error);
    }
  };
}

customElements.define("quote-box", QuoteBox);
