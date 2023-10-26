import { useState, useEffect } from "react";
import Quote from "../pages/api/quotes";
import Button from "../pages/Component/button";
import "animate.css";

export default function Home() {
  return (
    <div>
      <title>OneDay | OneVoice</title>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto my-auto">
          <Quote />
        </div>
      </div>
    </div>
  );
}
