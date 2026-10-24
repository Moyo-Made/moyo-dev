import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Case-study typography gets
// styled here in Step 5.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
