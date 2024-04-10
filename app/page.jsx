"use client";

import { CardsZone } from "@/components/card-zone";
import { DropZone } from "@/components/drop-zone";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//initial values for cards
const cardInitialValues = [
  { id: 1, name: "Fan", img: "/fan.png" },
  { id: 2, name: "Wire", img: "/wire.png" },
  { id: 7, name: "Home Battery", img: "/home-battery.png" },
  { id: 3, name: "Refrigerator", img: "/refrigerator.png" },
  { id: 4, name: "Switch", img: "/switch.png" },
  { id: 5, name: "Electric Socket", img: "/socket.png" },
  { id: 6, name: "AC", img: "/ac.png" },
  { id: 8, name: "Battery", img: "/battery.png" },
  { id: 9, name: "Nail", img: "/nail.png" },
];

const correctAnswers = [
  ["Electric Socket", "Battery", "Home Battery"],
  ["Refrigerator", "Fan", "AC"],
  ["Switch", "Wire", "Nail"],
];

export default function Home() {
  const [zones, setZones] = useState([
    { id: 1, name: "Source", cards: [] },
    { id: 2, name: "Load", cards: [] },
    { id: 3, name: "Path", cards: [] },
  ]);
  const [cards, setCards] = useState(cardInitialValues);
  const [results, setResults] = useState(null);

  //function to handle dropping the card
  const handleDrop = (zoneId, card) => {
    const updatedZones = zones.map((zone) => {
      if (zone.id === zoneId) {
        if (zone.cards.length < 3) {
          const newCards = cards.filter((c) => c.id !== card.id);
          setCards(newCards);
          return { ...zone, cards: [card, ...zone.cards] };
        }
      }
      return zone;
    });
    setZones(updatedZones);
  };

  // to check the correct answer
  const checkResult = () => {
    if (
      zones[0].cards.length < 3 ||
      zones[1].cards.length < 3 ||
      zones[2].cards.length < 3
    ) {
      alert("Please fill all fields");
      return;
    }

    const newResults = zones.map((zone, index) => {
      return (
        JSON.stringify(zone.cards.map((card) => card.name)) ===
        JSON.stringify(correctAnswers[index])
      );
    });

    setResults(newResults);
  };

  //add styling based on result
  const getCardClassName = (cardName, zoneId) => {
    if (results) {
      const zoneIndex = zones.findIndex((zone) => zone.id === zoneId);
      const correctAnswer = correctAnswers[zoneIndex];
      if (correctAnswer.includes(cardName)) {
        return "shadow-green-300";
      } else {
        return "shadow-red-300";
      }
    }
    return "";
  };

  //to reset the states
  const reset = () => {
    setZones([
      { id: 1, name: "Source", cards: [] },
      { id: 2, name: "Load", cards: [] },
      { id: 3, name: "Path", cards: [] },
    ]);
    setCards(cardInitialValues);
    setResults(null);
  };

  return (
    <div className="xl:max-w-[80%] w-full h-full mx-auto py-20">
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-5">
          <DropZone
            zones={zones}
            handleDrop={handleDrop}
            getCardClassName={getCardClassName}
          />
          <CardsZone cards={cards} />
        </div>
      </DndProvider>
      <div className="flex items-center justify-center gap-4 font-semibold mt-10">
        <button
          onClick={checkResult}
          disabled={results}
          className="bg-green-500 p-2 rounded text-white"
        >
          Check Result
        </button>
        <button
          onClick={reset}
          className="bg-yellow-500 rounded p-2 text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
