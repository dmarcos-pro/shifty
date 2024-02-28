"use client";

import { fetchProjects } from "@api";
import content from "@contentJson";
import { ProjectsContainer, ProjectsRefs } from "@type/container";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const Projects = () => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery("projects", () => fetchProjects());

  const [activeInterval, setActiveInterval] = useState<boolean>(true);
  const [step, setStep] = useState<{ id: string; i: number }>({ id: "", i: 0 });
  const maxStep = projects ? projects.length - 1 : 0;

  useEffect(() => {
    const brand = projects && projects[0]?.id;
    setStep({
      id: brand,
      i: 0,
    });
  }, [projects, setStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeInterval) {
      interval = setInterval(() => {
        setStep((prevStep) => {
          let newIndex = prevStep.i + 1;

          if (newIndex > maxStep) {
            newIndex = 0;
          }

          const nextStepId = projects && projects[newIndex]?.id;
          return { id: nextStepId, i: newIndex };
        });
      }, 4000);
    }

    return () => {
      if (activeInterval) {
        clearInterval(interval);
      }
    };
  }, [projects, activeInterval, maxStep]);

  const nextProject = () => {
    setActiveInterval(false);
    if (step.i < maxStep) {
      const nextStepId = projects[step.i + 1].id;
      setStep({ id: nextStepId, i: step.i + 1 });
    }
  };
  const prevProject = () => {
    setActiveInterval(false);
    if (step.i !== 0) {
      const prevStepId = projects[step.i - 1].id;
      setStep({ id: prevStepId, i: step.i - 1 });
    }
  };
  const selectProject = (index: number) => {
    setActiveInterval(false);
    const stepId = projects[index].id;
    setStep({ id: stepId, i: index });
  };
  const getShowIndices = () => {
    if (step.i === 0 || step.i === 1) {
      return Array.from({ length: 5 }, (_, i) => i);
    }
    if (step.i === maxStep - 1 || step.i === maxStep) {
      return Array.from({ length: 5 }, (_, i) => maxStep - 4 + i);
    }
    const showIndices = [];
    for (let x = step.i - 2; x <= step.i + 2; x++) {
      if (x >= 0 && x <= maxStep) {
        showIndices.push(x);
      }
    }
    return showIndices;
  };

  const [isVisible, setIsVisible] = useState({
    title: false,
  });
  const ref: ProjectsRefs = {
    title: useRef<HTMLDivElement>(null),
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
        title: inView(ref.title),
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref.title]);

  const getImage = (project: any) => {
    return require(`@images/project/mini/${project.id}.jpg`);
  };

  return (
    <section>
      <div>
        <div ref={ref.title}>
          <span dangerouslySetInnerHTML={{ __html: content.projects.tag }} />
          <h2 dangerouslySetInnerHTML={{ __html: content.projects.title }} />
        </div>
      </div>
      <div>
        <div>
          {projects &&
            projects.map((project: ProjectsContainer, index: number) => {
              return (
                <div
                  key={`project-title-${index}`}
                  onClick={() => {
                    selectProject(index);
                  }}
                >
                  <span>{project.brand}</span>
                </div>
              );
            })}
          <div>
            <span
              className={`link`}
              onClick={() => {
                prevProject();
              }}
            >
              {/* <Icon value="bigArrow" /> */}
            </span>
            <span
              className={`link`}
              onClick={() => {
                nextProject();
              }}
            >
              {/* <Icon value="bigArrow" /> */}
            </span>
          </div>
        </div>
        <div className={`linkProject`}>
          {step.id &&
            projects &&
            projects.map((project: ProjectsContainer, index: number) => {
              const tags = JSON.parse(project.tag);
              const img = getImage(project);
              return (
                <a
                  key={`project-mini-${index}`}
                  href={`/projets/${project.id}`}
                  style={{
                    backgroundImage: `url(${img.default.src})`,
                  }}
                >
                  <div>
                    {tags.map((cat: string, index: number) => {
                      return <span key={`project-cat-${index}`}>{cat}</span>;
                    })}
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
