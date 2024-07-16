import { Person } from "@prisma/client";

export const personSample: Person[] = [
  {
    id: 834,
    firstname: "Hannael",
    lastname: "Abrams",
    birthday: "12-06-2000",
    cin: "123456789",
    nationality: "Malgache",
    linkWithChief: "Chef",
    job: "Développeur",
    otherSource: "Non",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 835,
    firstname: null,
    lastname: "Joel",
    birthday: "17-12-1999",
    cin: null,
    nationality: "Malgache",
    linkWithChief: "Chef",
    job: null,
    otherSource: "Non",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
