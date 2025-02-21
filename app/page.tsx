"use client";

import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface StickerData {
  prefix: string;
  startNumber: number;
  endNumber: number;
  element: string;
  slOd: string;
  width: number;
  height: number;
}

const StickerComponent = React.forwardRef<
  HTMLDivElement,
  { stickers: string[] }
>(({ stickers }, ref) => (
  <div
    ref={ref}
    style={{ display: "flex", flexWrap: "wrap", gap: 0, margin: 0, padding: 0 }}
  >
    {stickers.map((sticker, index) => (
      <div
        key={index}
        className="sticker"
        dangerouslySetInnerHTML={{ __html: sticker }}
      />
    ))}
  </div>
));

export default function Home() {
  const [stickerData, setStickerData] = useState<StickerData>({
    prefix: "RG-24-SOI-",
    startNumber: 1,
    endNumber: 10,
    element: "",
    slOd: "1500 / 8 mm",
    width: 200,
    height: 100,
  });
  const [stickers, setStickers] = useState<string[]>([]);
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
    const scaleX = stickerData.width / 200;
    const scaleY = stickerData.height / 100;
    for (let i = stickerData.startNumber; i <= stickerData.endNumber; i++) {
      newStickers.push(`
        <div style="border: 1px solid black; padding: 0; margin: 0; width: ${
          200 * scaleX
        }px; height: ${
        100 * scaleY
      }px; text-align: left; font-family: 'Arial', sans-serif; page-break-inside: avoid;">
          <h3 style="margin: 0; padding: 0;">RTD GENIX PVT. LTD.</h3>
          <p style="margin: 0; padding: 0;">SR NO. :- ${stickerData.prefix}${i
        .toString()
        .padStart(2, "0")}</p>
          <p style="margin: 0; padding: 0;">Element :- ${
            stickerData.element
          }</p>
          <p style="margin: 0; padding: 0;">SL/OD :- ${stickerData.slOd}</p>
        </div>
      `);
    }
    setStickers(newStickers);
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Improved Product Sticker Generator
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="prefix">SR NO. Prefix</Label>
          <Input
            id="prefix"
            name="prefix"
            value={stickerData.prefix}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="startNumber">Start Number</Label>
          <Input
            id="startNumber"
            name="startNumber"
            type="number"
            value={stickerData.startNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="endNumber">End Number</Label>
          <Input
            id="endNumber"
            name="endNumber"
            type="number"
            value={stickerData.endNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="element">Element</Label>
          <Input
            id="element"
            name="element"
            value={stickerData.element}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="slOd">SL/OD</Label>
          <Input
            id="slOd"
            name="slOd"
            value={stickerData.slOd}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="width">Sticker Width (px)</Label>
          <Input
            id="width"
            name="width"
            type="number"
            value={stickerData.width}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="height">Sticker Height (px)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            value={stickerData.height}
            onChange={handleInputChange}
          />
        </div>
      </div>
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
            <div className="grid grid-cols-5 gap-0 mb-4">
              {stickers.map((sticker, index) => (
                <Card className="w-fit p-0 m-0" key={index}>
                  <CardContent
                    className="w-fit p-0 m-0"
                    dangerouslySetInnerHTML={{ __html: sticker }}
                  />
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
