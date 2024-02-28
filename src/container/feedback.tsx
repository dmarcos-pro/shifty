"use client";

import { fetchFeedback } from "@api";
import content from "@contentJson";
import { FeedbackContainer } from "@type/container";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSwipeable } from "react-swipeable";

const Feedback = () => {
  const [step, setStep] = useState<number>(0);
  const [feed, setFeed] = useState<number>(0);

  const {
    data: feedback,
    isLoading,
    isError,
  } = useQuery("feedback", () => fetchFeedback());

  useEffect(() => {
    if (!isLoading && feedback) setFeed(feedback.length);
  }, [isLoading, feedback]);

  const maxStep = feed - 1;

  const incrementStep = () => {
    if (step < maxStep) {
      setStep(step + 1);
    }
  };
  const decrementStep = () => {
    if (step !== 0) {
      setStep(step - 1);
    }
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: incrementStep,
    onSwipedRight: decrementStep,
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const refBox = useRef<any>(null);

  const inView = (elementRef: React.RefObject<any>) => {
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
      setIsVisible(inView(refBox));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      <div ref={refBox}>
        <div>
          <span>{content.feedback.title}</span>
        </div>
        <div
          content-step={step}
          style={{ left: -step * 100 + "%" }}
          {...swipeHandlers}
        >
          {feedback &&
            feedback.map((feedback: FeedbackContainer, index: number) => {
              return (
                <div key={`feedback-${index}`}>
                  <div>
                    <div dangerouslySetInnerHTML={{ __html: feedback.text }} />
                    <div>
                      <p>{feedback.who}</p>
                      <p>
                        {feedback.job} chez {feedback.brand}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <span
          onClick={() => {
            decrementStep();
          }}
          className={`link`}
        >
          {/* <Icon value="angleLeft" /> */}
        </span>
        <span
          onClick={() => {
            incrementStep();
          }}
          className={`link`}
        >
          {/* <Icon value="angleRight" /> */}
        </span>
      </div>
    </section>
  );
};

export default Feedback;
