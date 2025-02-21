import React from "react";

interface StickerProps {
  prefix: string;
  number: number;
  element: string;
  slOd: string;
  width: number;
  height: number;
}

const Sticker: React.FC<StickerProps> = ({
  prefix,
  number,
  element,
  slOd,
  width,
  height,
}) => {
  return (
    <div
      className="sticker border border-black text-left font-sans px-1 break-inside-avoid"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <h3 className="font-bold">RTD GENIX PVT. LTD.</h3>
      <p className="m-0 p-0">
        SR NO. :- {prefix}
        {number.toString().padStart(2, "0")}
      </p>
      <p>Element :- {element}</p>
      <p>SL/OD :- {slOd}</p>
    </div>
  );
};

export default Sticker;
