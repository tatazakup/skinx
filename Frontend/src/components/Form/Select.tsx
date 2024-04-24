import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Typography } from "../Typography/Typography";

type ItemsProps<TItems> = {
  id: string;
  title: string;
} & TItems;

type SelectProps<TItems> = {
  items: ItemsProps<TItems>[];
  placeholder?: string;
  render?: (item: ItemsProps<TItems>) => JSX.Element;
  hiddenChevron?: boolean;
  classNameSelection?: string;
  classNameItems?: string;
  target?: string;
};

type FormSelectFieldProps<TFieldValues extends FieldValues, TItems> = Omit<
  UseControllerProps<TFieldValues>,
  "rules"
> &
  SelectProps<TItems> & {
    className?: string;
  };

export const Select = <TFieldValues extends FieldValues, TItems>({
  render,
  items = [],
  name,
  shouldUnregister,
  defaultValue,
  control,
  className,
  classNameSelection,
  classNameItems,
}: FormSelectFieldProps<TFieldValues, TItems>) => {
  const { field } = useController({
    name,
    shouldUnregister,
    defaultValue,
    control,
  });

  const { value, onChange } = field;

  const onClickItem = (id: string) => {
    const data = items.find((item) => item.id === id);
    onChange(data);
  };

  return (
    <Menu
      as="div"
      className={`${
        className !== undefined ? className : "relative inline-block text-left"
      }`}
    >
      <Menu.Button
        className={`${
          classNameSelection !== undefined
            ? classNameSelection
            : "p-2 items-center gap-3 text-left inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        }`}
      >
        <>
          {render ? (
            render(value)
          ) : (
            <Typography className="w-full text-customGrey-400">
              {value}
            </Typography>
          )}
        </>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={
            classNameItems !== undefined
              ? classNameItems
              : "w-full overflow-y-auto max-h-48 absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none pb-1"
          }
        >
          {items.map((item) => {
            if (render)
              return (
                <Menu.Item key={`item-${item.title}`}>
                  {({ active }) => {
                    return (
                      <div
                        className={`
                        ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }
                          px-3 py-2 border-b border-gray-300 gap-3 items-center flex `}
                        onClick={() => onClickItem(item.id)}
                      >
                        {render(item)}
                      </div>
                    );
                  }}
                </Menu.Item>
              );
            else
              return (
                <Menu.Item key={`item-${item.title}`}>
                  {({ active }) => {
                    return (
                      <div
                        className={`
                          ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }
                            px-3 py-2 border-b border-gray-300 gap-3 items-center flex `}
                        onClick={() => onClickItem(item.id)}
                      >
                        <Typography className="w-full text-customGrey-400">
                          {item.title}
                        </Typography>
                      </div>
                    );
                  }}
                </Menu.Item>
              );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
