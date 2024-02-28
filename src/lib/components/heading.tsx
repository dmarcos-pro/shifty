import { cn } from "@lib/utils";
import { Anton as FontTitle } from "next/font/google";
import { type HeadingProps } from "../../type/component";

export const fontTitle = FontTitle({
  subsets: ["latin"],
  weight: "400",
});

const Heading = ({ tag, content }: HeadingProps) => {
  return (
    <>
      {tag === "h1" && (
        <h1
          className={cn(`text-h1`, fontTitle.className)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {tag === "h2" && (
        <h2
          className={cn("text-h2", fontTitle.className)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {tag === "h3" && (
        <h3
          className={cn("text-h3", fontTitle.className)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </>
  );
};

export default Heading;
