import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StickerData {
  prefix: string;
  startNumber: number | undefined;
  endNumber: number | undefined;
  element: string;
  slOd: string;
  width: number | undefined;
  height: number | undefined;
}

interface StickerFormProps {
  stickerData: StickerData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StickerForm: React.FC<StickerFormProps> = ({
  stickerData,
  handleInputChange,
}) => (
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
        min={1}
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
        min={1}
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
        min={1}
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
        min={1}
      />
    </div>
  </div>
);

export default StickerForm;
