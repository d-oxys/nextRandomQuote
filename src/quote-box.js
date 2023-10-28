const template = document.createElement("template");

template.innerHTML = `
  <style>
    /* Tambahkan gaya CSS di sini sesuai kebutuhan Anda */
  </style>
  <div id="quote-widget">
    <div id="quote"></div>
    <div id="author"></div>
    <button id="nextQuoteButton">Next Quote</button>
  </div>
`;

class QuoteWidget extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.quoteElement = this.shadowRoot.querySelector("#quote");
    this.authorElement = this.shadowRoot.querySelector("#author");
    this.nextQuoteButton = this.shadowRoot.querySelector("#nextQuoteButton");

    this.bgColorIndex = 0;
    this.bgColors = ["bg-blue-700", "bg-red-700", "bg-green-700", "bg-yellow-700", "bg-purple-700", "bg-pink-700", "bg-gray-700", "bg-indigo-700", "bg-orange-700", "bg-teal-700"];

    this.colorIndex = 1;
    this.colors = ["blue-700", "red-700", "green-700", "yellow-700", "purple-700", "pink-700", "gray-700", "indigo-700", "orange-700", "text-teal-700"];

    this.bodyElement = document.querySelector("body");

    this.getNextQuote();
    this.nextQuoteButton.addEventListener("click", () => this.getNextQuote());
  }

  getNextQuote() {
    this.bodyElement.className = `flex h-screen w-screen items-center justify-center transition ease-in-out ${this.bgColors[this.bgColorIndex]}`;
    this.authorElement.className = `mx-2 text-end font-semibold ${this.colors[this.colorIndex]} transition ease-in-out`;
    this.quoteElement.className = `my-4 font-sans text-2xl font-bold tracking-tight ${this.colors[this.colorIndex]} transition ease-in-out`;

    fetch("https://type.fit/api/quotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        this.quoteElement.textContent = `"${randomQuote.text}"`;
        this.authorElement.textContent = `- ${randomQuote.author}`;
      })
      .catch((error) => {
        console.error(error);
      });

    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    this.bgColorIndex = (this.bgColorIndex + 1) % this.bgColors.length;
  }
}

customElements.define("quote-widget", QuoteWidget);
