import * as runtime from "react/jsx-runtime";
import { BaseComponents } from "./base-mdx"; // import for base components



////////////////////////////////
const sharedComponents = {
    // Add your base components here
    ...BaseComponents,
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
      <section className="w-full h-full font-sans relative">
        <Component components={sharedComponents} />
      </section>
    );
  };