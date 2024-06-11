import { FormProvider, useForm } from "react-hook-form";

import CTextField from "./CTextField.jsx";

export default {
  component: CTextField,
  title: "CustomMUI/CTextField",
  // center the component
  parameters: {
    layout: "centered",
  },
  // tags for autodocs
  tags: ["autodocs"],

  // control types: https://storybook.js.org/docs/essentials/controls#annotation
  argTypes: {
    name: {
      control: "text",
      description: "Must be unique. Used internally for react hook form. ",
    },
    label: { control: "text", description: "Label for the input field" },
    // and others
  },
  decorators: [
    // for react hook form form components
    (Story) => (
      <FormProvider {...useForm()}>
        <Story />
      </FormProvider>
    ),
  ],
};

// two ways of exporting stories
// const Primary = () => <CTextField name="A" label="Azzz" />;
// export { Primary };

export const Primary = {
  args: {
    name: "primaryTextField",
    label: "Primary Text Field",
  },
};
