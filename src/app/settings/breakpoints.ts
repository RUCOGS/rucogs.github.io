export const Breakpoint = {
  Mobile: "MOBILE",
  MediumMobile: "MEDIUM_MOBILE",
  TinyMobile: "TINY_MOBILE",
  Desktop: "DESKTOP"
} as const;
export type Breakpoint = typeof Breakpoint[keyof typeof Breakpoint];

export const BreakpointsData: {
  query: string
  name: Breakpoint
}[] = [
  {
    name: Breakpoint.TinyMobile,
    query: "(max-width: 400px)",
  },
  {
    name: Breakpoint.MediumMobile,
    query: "(max-width: 700px)",
  },
  {
    name: Breakpoint.Mobile,
    query: "(max-width: 1180px)",
  },
  {
    name: Breakpoint.Desktop,
    query: ""
  },
];
