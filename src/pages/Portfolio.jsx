import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";

const ImageLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {(!loaded || error) && (
        <div
          className={`${className} bg-gradient-to-r from-muted/80 to-muted/60 animate-pulse rounded-lg`}
        />
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`${className} object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </>
  );
};

const ProjectCard = ({ project, getTagInfo }) => {
  return (
    <Card className="hover:shadow-lg flex flex-col h-full hover:scale-[1.02] duration-300 transition-transform will-change-transform">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <ImageLoader
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full rounded-t-lg"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="mt-2 text-base">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tagKey) => {
            const tag = getTagInfo(tagKey);
            return (
              <a
                title={`Learn more about ${tag.key}`}
                aria-label={`Learn about ${tag.key}`}
                key={tag.key}
                href={tag.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Badge
                  className={`${tag.colorClass} text-white font-medium hover:opacity-90 transition-opacity`}
                >
                  {tag.key}
                </Badge>
              </a>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-3">
        <Button asChild variant="outline" className="w-full gap-2">
          <a
            title="Github project code"
            aria-label={`View code for ${project.title} on GitHub`}
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </a>
        </Button>
        <Button asChild className="w-full gap-2">
          <a
            title="Live project demo"
            aria-label={`View live demo of ${project.title}`}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "ToDo List Web Application",
      description:
        "A modern, responsive To-Do List application with a sleek interface for optimal task management.",
      imageUrl: "/project_toDoList.webp",
      liveUrl: "https://portfolio-to-do-list.vercel.app/",
      codeUrl: "https://github.com/CarloGaspa/Portfolio-ToDoList.git",
      tags: ["Vite", "React", "Tailwind"],
    },
    {
      id: 2,
      title: "Portfolio Weather App",
      description:
        "A modern, responsive weather application with a beautiful interface for real-time forecasts.",
      imageUrl: "/project_weatherApp.webp",
      liveUrl: "https://portfolio-weather.vercel.app/",
      codeUrl: "https://github.com/CarloGaspa/Portfolio-Weather.git",
      tags: ["Vite", "React", "Tailwind", "Zustand", "Shadcn UI"],
    },
  ];

  const tagsInfo = [
    { key: "Vite", colorClass: "bg-[--chart-1]", link: "https://vitejs.dev" },
    { key: "React", colorClass: "bg-[--chart-2]", link: "https://react.dev" },
    {
      key: "Tailwind",
      colorClass: "bg-[--chart-3]",
      link: "https://tailwindcss.com",
    },
    {
      key: "Zustand",
      colorClass: "bg-[--chart-4]",
      link: "https://zustand-demo.pmnd.rs",
    },
    {
      key: "Shadcn UI",
      colorClass: "bg-[--chart-5]",
      link: "https://ui.shadcn.com",
    },
  ];

  const getTagInfo = (tagKey) =>
    tagsInfo.find((tag) => tag.key === tagKey) || {
      key: tagKey,
      colorClass: "bg-secondary",
      link: "#",
    };

  return (
    <section className="container py-1 lg:py-12 m-auto">
      <div className="mx-auto max-w-3xl text-center mb-6 lg:mb-16">
        <h2 className="text-3xl text-foreground font-bold tracking-tight sm:text-4xl">
          My Projects
        </h2>
        <p className="mt-2 lg:mt-4 text-lg text-muted-foreground">
          Some of the works I have realized
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            getTagInfo={getTagInfo}
          />
        ))}
      </div>
    </section>
  );
}
