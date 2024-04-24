import { UseFormReturn } from "react-hook-form";
import { TextField } from "@components/Form/TextField";
import { Select } from "@components/Form/Select";
import { FilterSchemaType, SEARCH_BY } from "./PostPage";
import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/Button/Button";

type FilterSectionProps = {
  filterSchema: UseFormReturn<FilterSchemaType>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterSection = (props: FilterSectionProps) => {
  const { watch, control, setValue, handleSubmit } = props.filterSchema;

  const onSubmit = handleSubmit(() => {
    props.setState(true);
  });

  return (
    <div className="flex fixed bg-white z-50 w-full">
      <div>
        <Typography>Search By</Typography>
        <Select
          control={control}
          name="searchBy"
          items={SEARCH_BY}
          render={(v) => <>{v.title}</>}
        />
      </div>
      <TextField control={control} name="search" label="search" />
      <Button
        onClick={() => {
          setValue("page", 0);
          onSubmit();
        }}
      >
        Search
      </Button>
      <div className="w-full flex justify-center items-center">
        <Button
          className={`${
            watch("page") === 0
              ? "hidden"
              : "px-4 py-2 text-sm font-medium border-2"
          }`}
          onClick={() => {
            setValue("page", watch("page") - 1);
            onSubmit();
          }}
        >
          Pre
        </Button>
        <Button
          onClick={() => {
            setValue("page", watch("page") + 1);
            onSubmit();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
