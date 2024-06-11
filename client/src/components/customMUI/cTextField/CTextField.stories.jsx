import { FormProvider, useForm } from "react-hook-form";

import CTextField from "./CTextField.jsx";

export default {
  component: CTextField,
  title: "CustomMUI/CTextField",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Must be unique. Used internally for react hook form. ",
    },
    label: { control: "text", description: "Label for the input field" },
    variant: {
      options: ["outlined", "standard", "filled"],
      control: { type: "radio" },
    },
  },
  decorators: [
    (Story) => (
      <FormProvider {...useForm()}>
        <Story />
      </FormProvider>
    ),
  ],
};

// const Primary = () => <CTextField name="A" label="Azzz" />;

// export { Primary };

export const Primary = {
  args: {
    name: "primaryTextField",
    label: "Primary Text Field",
    variant: "outlined",
  },
};
