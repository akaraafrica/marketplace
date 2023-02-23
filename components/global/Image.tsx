import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

type ImageWithProps = ImageProps;
function NextImage(props: ImageWithProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          width: "100%",
          height: "100%",
        }}
      ></div>
      <Image
        {...props}
        src={props.src || "/assets/placeholder-image.jpg"}
        alt={props.alt || "default"}
        style={{ ...(isImageLoaded ? {} : { visibility: "hidden" }) }}
        /* set flag after image loading is complete */
        onLoadingComplete={() => {
          setIsImageLoaded(true);
        }}
      />
    </div>
  );
}

export default NextImage;
