import { useDrop } from "react-dnd";
import Image from "next/image";

export const DropZone = ({ zones, handleDrop, getCardClassName }) => {
  return (
    <div className="flex flex-col flex-1 gap-5">
      {zones.map((zone) => (
        <DropTarget
          key={zone.id}
          zoneId={zone.id}
          zoneName={zone.name}
          cards={zone.cards}
          onDrop={handleDrop}
          getCardClassName={getCardClassName}
        />
      ))}
    </div>
  );
};

const DropTarget = ({ zoneId, onDrop, cards, zoneName, getCardClassName }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CARD",
    drop: (item) => {
      onDrop(zoneId, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`border flex items-center shadow-lg p-4 h-56 rounded-lg relative ${
        isActive ? "bg-gray-100" : ""
      } ${cards.length > 0 ? "justify-between" : "gap-8"}`}
    >
      <div className="bg-blue-800 text-white font-semibold rounded px-2 py-1">
        {zoneName}
      </div>
      {cards.length === 0 && (
        <div className="text-slate-500 text-5xl">Drag items here...</div>
      )}
      {cards.length > 0 && (
        <div className="flex items-center gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`shadow-lg border w-40 h-40  flex flex-col items-center ${getCardClassName(
                card.name,
                zoneId
              )}`}
            >
              <div className="relative w-36 h-36">
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-blue-700">{card.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
