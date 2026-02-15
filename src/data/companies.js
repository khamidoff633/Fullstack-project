import office1 from "../assets/images/real/dev-setup.png";
import office2 from "../assets/images/real/dev-desk.png";
import team1 from "../assets/images/real/office-chat.png";
import team2 from "../assets/images/real/team-collab.png";

// Demo data (front-end only). You can later replace with real API.

export const companies = [
  {
    id: "c1",
    name: "TechCorp",
    logoText: "TC",
    cover: office1,
    industry: "Technology",
    size: "1000-5000",
    location: "San Francisco, CA",
    website: "https://example.com",
    openRoles: 24,
    about:
      "We build tools that help teams ship faster. Remote-friendly, high standards, fast execution.",
  },
  {
    id: "c2",
    name: "DesignHub",
    logoText: "DH",
    cover: office2,
    industry: "Design",
    size: "50-200",
    location: "New York, NY",
    website: "https://example.com",
    openRoles: 12,
    about:
      "A product design studio building modern digital experiences with strong craft and systems thinking.",
  },
  {
    id: "c3",
    name: "DataSystems",
    logoText: "DS",
        cover: team1,
industry: "Data",
    size: "200-500",
    location: "Austin, TX",
    website: "https://example.com",
    openRoles: 8,
    about:
      "Data infrastructure and analytics products for the modern enterprise.",
  },
  {
    id: "c4",
    name: "CloudNine",
    logoText: "CN",
        cover: team2,
industry: "Cloud",
    size: "500-1000",
    location: "Seattle, WA",
    website: "https://example.com",
    openRoles: 16,
    about:
      "Cloud-native platforms for teams that need reliability and scale.",
  },
  {
    id: "c5",
    name: "FinPeak",
    logoText: "FP",
        cover: office1,
industry: "Fintech",
    size: "200-500",
    location: "Berlin, DE",
    website: "https://example.com",
    openRoles: 6,
    about:
      "Fintech products focused on speed, clarity, and great user experience.",
  },
  {
    id: "c6",
    name: "Marketly",
    logoText: "MK",
        cover: office2,
industry: "Marketing",
    size: "50-200",
    location: "London, UK",
    website: "https://example.com",
    openRoles: 10,
    about:
      "Marketing automation and experimentation tools for growth teams.",
  },
];

export default companies;
