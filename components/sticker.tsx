import React from "react";

interface StickerProps {
  prefix: string;
  number: number;
  element: string;
  slOd?: string;
  wireLength?: string;
  mfgDate?: string;
  productIdentifier?: string;
}

const Sticker: React.FC<StickerProps> = ({
  prefix,
  number,
  element,
  slOd,
  wireLength,
  mfgDate,
  productIdentifier,
}) => {
  return (
    <div className="border border-black text-left px-1 break-inside-avoid font-serif rounded-md">
      <h3 className="font-bold">RTD GENIX PVT. LTD.</h3>
      {productIdentifier && (
        <p className="text-xs text-center">{productIdentifier}</p>
      )}
      <p className="text-sm">
        SR NO. :- {prefix}
        {number.toString().padStart(3, "0")}
      </p>
      {element && <p className="text-sm">Element :- {element}</p>}{" "}
      {wireLength && <p className="text-sm">Wire Length :- {wireLength}</p>}{" "}
      {slOd && <p className="text-sm">SL/OD :- {slOd}</p>}{" "}
      {mfgDate && <div className="text-sm">MFG: {mfgDate}</div>}{" "}
    </div>
  );
};

export default Sticker;
