import React from "react";
import Image, { ImageProps } from "next/image";

type ImageWithProps = ImageProps;
function NextImage(props: ImageWithProps) {
  return (
    <Image
      {...props}
      src={props.src || "/assets/placeholder-image.jpg"}
      alt={props.alt || "default"}
    />
  );
}

export default NextImage;
