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

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "ToDo List Web Application",
      description:
        "A modern, responsive To-Do List application with a sleek interface for optimal task management.",
      imageUrl: "/project_toDoList.png",
      liveUrl: "https://portfolio-to-do-list.vercel.app/",
      codeUrl: "https://github.com/CarloGaspa/Portfolio-ToDoList.git",
      tags: ["Vite", "React", "Tailwind"],
    },
    {
      id: 2,
      title: "Portfolio Weather App",
      description:
        "A modern, responsive weather application with a beautiful interface for real-time forecasts.",
      imageUrl: "/project_weatherApp.png",
      liveUrl: "https://portfolio-weather.vercel.app/",
      codeUrl: "https://github.com/CarloGaspa/Portfolio-Weather.git",
      tags: ["Vite", "React", "Tailwind", "Zustand", "Shadcn UI"],
    },
  ];

  return (
    <section className="container py-4 m-auto">
      <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
        <h2 className="text-3xl text-foreground font-bold tracking-tight sm:text-4xl">
          My Projects
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Some of the works I have realised
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover w-full h-full rounded-t-lg"
                  loading="lazy"
                />
              </AspectRatio>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button asChild variant="outline" className="w-full">
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Codice
                </a>
              </Button>
              <Button asChild className="w-full">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
