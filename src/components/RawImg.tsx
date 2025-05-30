import React from "react";

interface RawImgProps {
  image: string;
  altText?: string;
  css?: React.CSSProperties | Record<string, any>;
  $name?: string;
  className?: string;
}

export function RawImg({
  image,
  altText = "",
  css = {},
  $name,
  className,
  ...props
}: RawImgProps) {
  const imgStyle = {
    ...css
  };

  return (
    <img
      src={image}
      alt={altText}
      style={imgStyle}
      className={className}
      data-name={$name}
      {...props}
    />
  );
}
