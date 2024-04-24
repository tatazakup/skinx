import { Typography, TypographyProps } from "../Typography/Typography";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type TextFieldProps<TFieldValues extends FieldValues> = Omit<
  UseControllerProps<TFieldValues>,
  "rules"
> & {
  label?: string;
  inputOption?: Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    ""
  > & {
    "data-cy"?: string;
  };
  textOption?: TypographyProps;
};

export const TextField = <TFieldValues extends FieldValues>(
  props: TextFieldProps<TFieldValues>
) => {
  const {
    name,
    shouldUnregister,
    defaultValue,
    control,
    label,
    inputOption = {
      type: "text",
    },
    textOption,
  } = props;

  const { field } = useController({
    name,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <Typography {...textOption}>{label}</Typography>}
      <input
        className="px-4 py-3 text-B2 font-medium bg-white border-customGrey-300 border-[1px] rounded-md"
        {...field}
        {...inputOption}
      />
    </div>
  );
};
