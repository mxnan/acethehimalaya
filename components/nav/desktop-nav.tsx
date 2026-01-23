import dynamic from "next/dynamic";

// Client-side nav with framer-motion animations
const DesktopNavClient = dynamic(
  () => import("./desktop-nav.client").then((mod) => mod.DesktopNavClient),
  {
    ssr: true,
  }
);

// Server component wrapper: renders the client nav only on the client,
// keeping menu animations and hover behavior out of the server bundle.
const DesktopNav = () => {
  return <DesktopNavClient />;
};

export default DesktopNav;
