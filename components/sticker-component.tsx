import React from "react";
import Sticker from "./sticker";

interface StickerComponentProps {
  stickers: {
    prefix: string;
    number: number;
    element: string;
    slOd: string;
    mfgDate?: string;
    productIdentifier?: string;
  }[];
}

const StickerComponent = React.forwardRef<
  HTMLDivElement,
  StickerComponentProps
>(({ stickers }, ref) => (
  <div
    ref={ref}
    className="break-inside-avoid flex flex-wrap justify-start p-1 gap-1"
  >
    {stickers.map((sticker, index) => (
      <Sticker key={index} {...sticker} />
    ))}
  </div>
));

StickerComponent.displayName = "StickerComponent";

export default StickerComponent;
