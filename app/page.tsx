"use client";

import type React from "react";

import { useState } from "react";
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
}

export default function Home() {
  const [stickerData, setStickerData] = useState<StickerData>({
    prefix: "RG-24-SOI-",
    startNumber: 1,
    endNumber: 10,
    element: "PT-100 x 2",
    slOd: "1500 / 8 mm",
  });
  const [stickers, setStickers] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStickerData((prev) => ({
      ...prev,
      [name]:
        name === "startNumber" || name === "endNumber"
          ? Number.parseInt(value)
          : value,
    }));
  };

  const generateStickers = () => {
    const newStickers = [];
    for (let i = stickerData.startNumber; i <= stickerData.endNumber; i++) {
      newStickers.push(`
        <div style="border: 1px solid black; padding: 10px; margin: 10px; width: 200px; text-align: center;">
          <h3>RTD GENIX PVT. LTD.</h3>
          <p>SR NO. :- ${stickerData.prefix}${i.toString().padStart(2, "0")}</p>
          <p>Element :- ${stickerData.element}</p>
          <p>SL/OD :- ${stickerData.slOd}</p>
        </div>
      `);
    }
    setStickers(newStickers);
  };

  const printStickers = () => {
    const printWindow = window.open("", "", "height=500,width=800");
    printWindow!.document.write(
      "<html><head><title>Product Stickers</title></head><body>"
    );
    printWindow!.document.write(stickers.join(""));
    printWindow!.document.write("</body></html>");
    printWindow!.document.close();
    printWindow!.print();
  };

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
      </div>
      <div className="flex justify-between mb-4">
        <Button onClick={generateStickers} className="mb-4">
          Generate Stickers
        </Button>
        <Button variant={"destructive"} onClick={printStickers}>
          Print Stickers
        </Button>
      </div>
      {stickers.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-2">Preview</h2>
          <ScrollArea className="h-[50vh]">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {stickers.map((sticker, index) => (
                <Card key={index}>
                  <CardContent dangerouslySetInnerHTML={{ __html: sticker }} />
                </Card>
              ))}
            </div>
            <ScrollBar></ScrollBar>
          </ScrollArea>
        </>
      )}
    </div>
  );
}
