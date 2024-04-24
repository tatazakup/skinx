import { useMemo } from "react";

export type TypographyProps = {
  skwidth?: string;
  skpadding?: string;
} & React.ButtonHTMLAttributes<HTMLParagraphElement>;

export const Typography = (attributes: TypographyProps) => {
  const { children, className, skwidth, skpadding = "py-2" } = attributes;

  const heightSkeleton = useMemo(() => {
    let height = "h-2";
    if (className !== undefined) {
      if (className.includes("text-xs")) {
        height = "h-2.5";
      } else if (className.includes("text-2xl")) {
        height = "h-8";
      }
    }

    return height;
  }, [className]);

  if (children === undefined) {
    return (
      <div className={`${skpadding} animate-pulse max-w-lg`}>
        <div
          className={`${className} ${heightSkeleton} bg-gray-200 rounded-full ${
            skwidth ? skwidth : "w-32"
          }`}
        ></div>
      </div>
    );
  } else {
    return <p {...attributes}>{children}</p>;
  }
};
