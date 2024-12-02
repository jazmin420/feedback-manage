import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

function EmojiRating({ handleEmojiSelect }) {
  const [selected, setSelected] = useState("");

  const emojis = [
    { label: "Excellent", emoji: "🤩" },
    { label: "Good", emoji: "😊" },
    { label: "Okay", emoji: "😐" },
    { label: "Bad", emoji: "😞" },
    { label: "Terrible", emoji: "😡" },
  ];

  const handleClick = (emoji) => {
    setSelected(emoji);
    handleEmojiSelect(emoji);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-3">
        <h2 className="text-lg">Rate Your Experience</h2>
        <div className="flex justify-center gap-4">
          {emojis.map((item, index) => (
            <Button
              key={index}
              className={`text-2xl p-2 rounded ${
                selected === item.emoji ? "bg-black" : "bg-gray-200"
              }`}
              onClick={() => handleClick(item.emoji)}
            >
              {item.emoji}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

export default EmojiRating;
