export type ResponseProps<T extends {}> = {
  data: T;
};

export type ErrorProps = {
  message: string;
};
