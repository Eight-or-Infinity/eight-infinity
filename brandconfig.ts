import profileImage from "./src/assets/profile-image.png";

// Consider this project for file structure inspiration
// https://github.com/brunsten/vike-react-netlify/tree/main

const intro = {
  name: "Eight or Infinity",
  image: { location: profileImage, alt: "Eight/Infinity logo" },
  credentials: [{ title: "", org: "", url: "" }],
  description: (``
    + `A virtual Space Station for the Dreamers & Builders, `
    + `the Knowers & Explorers, the Gamers & Creators; `
    + `TOGETHER, we'll build Ourselves, Each Other AND the Future. `
    + `FOR THE BETTERMENT OF ALL.`
  ),
  secondary: "Join the ship 🚀",
};

const links = {
  socials: [
    { username: "xKhfQQD", org: "Discord", link: "https://discord.gg/" },
    {
      username: "EightOrInfinity",
      org: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      username: "EightOrInfinity",
      org: "Twitter",
      link: "https://twitter.com/",
    },
    {
      username: "EightOrInfinityInsta",
      org: "Instagram",
      link: "https://www.instagram.com/",
    },
  ],
  shop: [{ username: "", org: "", link: "" }],
  stream: [
    {
      username: "5h0ddIsDxcW9yEMYltEnWK",
      org: "Spotify",
      link: "https://open.spotify.com/show/",
    },
    {
      username: "UCPUaqPMKwGeIGZujEpHXrzA",
      org: "YouTube",
      link: "https://www.youtube.com/channel/",
    },
  ],
};

const siteMetadata = {
  title: `${intro.name} — ${intro.secondary}`,
  description: `${intro.description}`,
  author: `@EightOrInfinity`,
  image: intro.image, // Path to your image you placed in the 'static' folder
  url: `https://eightorinfinity.com`,
  intro,
  links,
};

export default siteMetadata;
