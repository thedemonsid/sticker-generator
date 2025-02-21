import React from "react";

interface StickerProps {
  prefix: string;
  number: number;
  element: string;
  slOd: string;
  width: number;
  mfgDate?: string;
}

const Sticker: React.FC<StickerProps> = ({
  prefix,
  number,
  element,
  slOd,
  width,
  mfgDate,
}) => {
  return (
    <div
      className="sticker border border-black text-left font-sans px-1 break-inside-avoid"
      style={{ width: `${width}px` }}
    >
      <h3 className="font-bold">RTD GENIX PVT. LTD.</h3>
      <p>
        SR NO. :- {prefix}
        {number.toString().padStart(2, "0")}
      </p>
      {element && <p>Element :- {element}</p>} <p>SL/OD :- {slOd}</p>
      {mfgDate && <div>MFG: {mfgDate}</div>}{" "}
      {/* Conditionally render mfgDate */}
    </div>
  );
};

export default Sticker;
