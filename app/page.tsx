"use client";

import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import StickerComponent from "@/components/sticker-component";
import StickerForm from "@/components/sticker-form";
import Sticker from "@/components/sticker";

interface StickerData {
  prefix: string;
  startNumber: number;
  endNumber: number;
  element: string;
  slOd: string;
  wireLength?: string;
  number: number;
  mfgDate?: string;
  productIdentifier?: string;
}

export default function Home() {
  const [stickerData, setStickerData] = useState<StickerData>({
    prefix: "RG-24-SOI-",
    startNumber: 1,
    endNumber: 10,
    element: "",
    slOd: "1500 / 8 mm",
    wireLength: "",
    number: 1,
    mfgDate: "",
    productIdentifier: "",
  });
  const [stickers, setStickers] = useState<StickerData[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStickerData((prev) => ({
      ...prev,
      [name]:
        name === "startNumber" ||
        name === "endNumber" ||
        name === "width" ||
        name === "height"
          ? Number.parseInt(value)
          : value,
    }));
  };

  const generateStickers = () => {
    const newStickers = [];
    for (let i = stickerData.startNumber; i <= stickerData.endNumber; i++) {
      newStickers.push({
        prefix: stickerData.prefix,
        startNumber: stickerData.startNumber,
        endNumber: stickerData.endNumber,
        number: i,
        element: stickerData.element,
        slOd: stickerData.slOd,
        wireLength: stickerData.wireLength,
        mfgDate: stickerData.mfgDate,
        productIdentifier: stickerData.productIdentifier,
      });
    }
    setStickers(newStickers);
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">
        Improved Product Sticker Generator
      </h1>
      <StickerForm
        stickerData={stickerData}
        handleInputChange={handleInputChange}
      />
      <div className="flex justify-between mb-4">
        <Button onClick={generateStickers} className="mb-4">
          Generate Stickers
        </Button>
        <Button variant={"destructive"} onClick={() => handlePrint()}>
          Print Stickers
        </Button>
      </div>
      {stickers.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-2">Preview</h2>
          <ScrollArea className="h-[400px]">
            <div className="flex flex-wrap justify-start gap-0 mb-4">
              {stickers.map((sticker, index) => (
                <Card className="w-fit p-0 m-0" key={index}>
                  <Sticker {...sticker} />
                </Card>
              ))}
            </div>
            <ScrollBar></ScrollBar>
          </ScrollArea>
        </>
      )}
      <div style={{ display: "none" }}>
        <StickerComponent ref={componentRef} stickers={stickers} />
      </div>
    </div>
  );
}
