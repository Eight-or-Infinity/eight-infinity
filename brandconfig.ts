import profileImage from "./src/images/profile-image.png";

const intro = {
  name: "Eight or Infinity",
  image: { location: profileImage, alt: "Eight/Infinity logo" },
  main: "Exploring worlds",
  secondary: "Join the ship",
  credentials: [{ title: "", org: "", url: "" }],
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
  title: `Eight or Infinity`,
  description: `${intro.main} | ${intro.secondary}`,
  author: `@EightOrInfinity`,
  image: intro.image, // Path to your image you placed in the 'static' folder
  url: `https://eightorinfinity.com`,
  intro,
  links,
};

export default siteMetadata;
