export const appName: string = "CultraX";

interface Social {
  name: string;
  url?: string | null;
  id?: string | null;
}

export const socials: Social[] = [
  {
    name: "Twitter",
    url: "https://twitter.com/yourprofile",
    id: "twitter",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
    id: "linkedin",
  },
];
