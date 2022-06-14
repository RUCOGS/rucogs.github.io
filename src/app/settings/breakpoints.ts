export const Breakpoint = {
  Mobile: "MOBILE",
  MediumMobile: "MEDIUM_MOBILE",
  TinyMobile: "TINY_MOBILE",
  Desktop: "DESKTOP"
} as const;
export type Breakpoint = typeof Breakpoint[keyof typeof Breakpoint];

export const BreakpointsData: {
  maxWidth: string
  name: Breakpoint
}[] = [
  {
    name: Breakpoint.TinyMobile,
    maxWidth: "400px",
  },
  {
    name: Breakpoint.MediumMobile,
    maxWidth: "700px",
  },
  {
    name: Breakpoint.Mobile,
    maxWidth: "1180px",
  },
  {
    name: Breakpoint.Desktop,
    maxWidth: ""
  },
];
