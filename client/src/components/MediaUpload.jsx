import React from "react";
import { Input } from "@material-tailwind/react";

function MediaUpload({ formData, handleInputChange }) {
  return (
    <>
      <div className="w-3/4 m-auto py-3">
        <h2 className="text-center mb-6 text-3xl text-gray-800 font-bold">
          Media Uploads
        </h2>
        <div className="flex flex-col justify-center items-center gap-6">
          <Input
            label="Video"
            type="file"
            name="video"
            accept="video/*"
            onChange={handleInputChange}
          />
          <Input
            label="Image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
          <Input
            label="Invoice"
            type="file"
            name="invoice"
            accept="image/*,application/pdf"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
}

export default MediaUpload;
