// storybook text field from material ui

import { CTextField } from "./CTextField";

export default {
  component: CTextField,
};

export const Primary = () => (
  <CTextField label="Primary" variant="outlined" color="primary" />
);
