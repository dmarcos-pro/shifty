"use client";
import content from "@contentJson";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { fetchServices } from "../api/index";
import { type ServicesContainer } from "../type/container";
import Service from "./service";

const Services = () => {
  const [isVisible, setIsVisible] = useState({
    title: true,
  });

  const ref = {
    title: useRef(null),
  };

  const inView = (elementRef: any) => {
    if (elementRef.current) {
      const boundingBox = elementRef.current.getBoundingClientRect();
      return (
        boundingBox.top < window.innerHeight - 150 && boundingBox.bottom >= 0
      );
    }
    return true;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible((prev) => ({
        ...prev,
        title: inView(ref.title),
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref.title]);

  const { data: services } = useQuery("services", () => fetchServices());

  return (
    <section>
      <div>
        <div ref={ref.title}>
          <span className="">{content.services.tag}</span>
          <h2>{content.services.title}</h2>
        </div>

        <div>
          {services &&
            services.map((service: ServicesContainer, index: number) => {
              return (
                <Service
                  key={`offer-${service.id}`}
                  category={service.category}
                  title={service.name}
                  id={service.id}
                  index={index}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Services;
