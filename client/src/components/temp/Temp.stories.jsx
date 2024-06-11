import { FormProvider, useForm } from "react-hook-form";
import Temp from "./Temp";

export default {
  component: Temp,
  title: "Temp",
  decorators: [
    (Story) => (
      <FormProvider {...useForm()}>
        <Story />
      </FormProvider>
    ),
  ],
};

const Primary = () => <Temp name="A" />;

export { Primary };
