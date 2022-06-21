import React from "react";
import Image, { ImageProps } from "next/image";

type ImageWithProps = ImageProps;
function NextImage(props: ImageWithProps) {
  return <Image {...props} alt="" />;
}

export default NextImage;
