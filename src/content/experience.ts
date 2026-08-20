import type { Experience } from "./types";

export const experiences = [
  {
    company: "MongoDB",
    role: "Software Engineer II to Software Engineer III",
    period: "August 2023 to present",
    location: "New York, New York",
    summary:
      "Building developer productivity and CI/CD systems for engineers working at scale.",
    highlights: [
      "Develops tooling that makes complex engineering workflows faster and easier to understand.",
      "Works across Go, TypeScript, distributed systems, and internal developer platforms.",
    ],
  },
  {
    company: "Addigy",
    role: "Junior Software Engineer",
    period: "January 2023 to July 2023",
    location: "Miami, Florida",
    summary:
      "Worked across a fleet of connected services supporting device-management workflows.",
    highlights: [
      "Developed Go services backed by MongoDB and SQLite in a Kubernetes environment.",
      "Built webhook services that synchronized hundreds of accounts and thousands of users.",
    ],
  },
  {
    company: "4Geeks Academy",
    role: "Full-stack Bootcamp Instructor",
    period: "September 2022 to January 2023",
    location: "Miami, Florida",
    summary:
      "Taught a cohort of developers how to build and reason about complete web applications.",
    highlights: [
      "Covered JavaScript, React, Node.js, Python, Flask, SQLAlchemy, testing, and REST APIs.",
    ],
  },
  {
    company: "MongoDB",
    role: "Software Engineer Intern",
    period: "June 2022 to August 2022",
    location: "New York, New York",
    summary:
      "Contributed to distributed CI/CD tooling used by engineering teams across MongoDB.",
    highlights: [
      "Improved test restart behavior so large suites could rerun only the failed work.",
      "Shipped changes across Go services, REST endpoints, MongoDB pipelines, and TypeScript interfaces.",
    ],
  },
  {
    company: "MetLife",
    role: "Software Engineer Intern",
    period: "June 2021 to August 2021",
    location: "Cary, North Carolina",
    summary:
      "Improved the performance and usability of a smoke-testing platform used across the organization.",
    highlights: [
      "Introduced concurrent requests and client caching to reduce cold-start waiting time.",
      "Rebalanced work between the Angular client and backend services to reduce server load.",
    ],
  },
] as const satisfies readonly Experience[];
