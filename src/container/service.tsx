import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { type ServiceAnim, type ServiceProps } from "../type/component";

const delays = ["delay2", "delay4", "delay6", "delay8"];

const Service = (props: ServiceProps) => {
  const [isVisible, setIsVisible] = useState<ServiceAnim>({
    box: false,
  });

  const ref = {
    box: useRef<HTMLDivElement>(null),
  };

  const inView = (elementRef: React.RefObject<HTMLElement>) => {
    if (elementRef.current) {
      const boundingBox = elementRef.current.getBoundingClientRect();
      return (
        boundingBox.top < window.innerHeight - 150 && boundingBox.bottom >= 0
      );
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible((prev) => ({
        ...prev,
        box: inView(ref.box),
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const delayClass = props.index < delays.length ? delays[props.index] : "";

  return (
    <div ref={ref.box}>
      <Link href={`/services/${props.id}`}>
        <div>
          <span>{props.category}</span>
          <h3 dangerouslySetInnerHTML={{ __html: props.title }} />
        </div>
        {/* <Icon value="bigArrow"></Icon> */}
      </Link>
    </div>
  );
};

export default Service;
