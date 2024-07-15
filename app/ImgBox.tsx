import React from "react";
import Image from "next/image";

import { readdir } from "fs/promises";
const ImgBox = async () => {
  const basePath = "./public/uploads";
  let files: string[] = [];
  try {
    files = await readdir(basePath);
  } catch {
    console.log("Error reading files");
  }
  const imgSrc = "/uploads/";
  const imgPaths = files?.map((filename) => imgSrc + filename);
  // console.log(imgPaths);

  const renderImgs = imgPaths.map((imgPath) => (
    <div
      key={imgPath}
      style={{
        position: "relative",
        width: "100px",
        height: "100px",
      }}
    >
      <Image
        src={imgPath}
        fill
        alt="xx"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  ));

  return (
    <div
      style={{
        width: "100%",
        padding: "0 20vw",
        display: "flex",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {renderImgs}
    </div>
  );
};

export default ImgBox;
