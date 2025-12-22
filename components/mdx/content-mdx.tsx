import * as runtime from "react/jsx-runtime";
import { BaseComponents } from "./base-mdx"; // import for base components
import { Button } from "../ui/button";
import MDXErrorBoundary from "./error-boundary";

// Logo component for use in MDX files
const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      src="/logo.svg"
      alt="Logo"
      className={className}
      style={{ width: "1em", height: "1em" }}
    />
  );
};

////////////////////////////////
const sharedComponents = {
  // Add your base components here
  ...BaseComponents,
  Button,
  Logo,
  // Add your custom components here
};

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
}

// MDXContent component
export const MDXContent = ({ code }: MDXProps) => {
  const Component = useMDXComponent(code);
  return (
    <MDXErrorBoundary>
      <section className="w-full h-full font-sans relative">
        <Component components={sharedComponents} />
      </section>
    </MDXErrorBoundary>
  );
};
