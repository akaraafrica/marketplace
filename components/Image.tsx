import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

type ImageWithProps = ImageProps;
function NextImage(props: ImageWithProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
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
  );
}

export default NextImage;
