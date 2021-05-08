export const size = {
  m: "640px",
  lg: "1024px",
  xlg: "1140px",
};

export const breakpoint = {
  m: `(max-width: ${size.m})`,
  lg: `(min-width: ${size.lg})`,
  xlg: `(min-width: ${size.xlg})`,
  mobile: `(max-width: ${size.m})`,
  mlg: `(max-width: ${size.lg})`,
  mxlg: `(max-width: ${size.xlg})`,
};
