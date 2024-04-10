import { useDrag } from "react-dnd";
import Image from "next/image";

export const CardsZone = ({ cards }) => {
  return (
    <div className="flex-1 px-8 py-4 rounded border shadow-lg grid grid-cols-3 grid-rows-3 gap-5 place-items-center">
      {cards.map((card, index) => (
        <DraggableCard key={card.id} card={card} cards={cards} />
      ))}
    </div>
  );
};

const DraggableCard = ({ card, cards }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: {
      ...card,
      index: cards.findIndex((c) => c.id === card.id),
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={drag}
      style={{ opacity }}
      className="rounded shadow-lg border w-48 h-48 cursor-grab flex flex-col items-center justify-center gap-1"
    >
      <div className="relative w-36 h-36">
        <Image src={card.img} alt={card.name} fill className="object-contain" />
      </div>
      <span className="text-blue-700">{card.name}</span>
    </div>
  );
};
