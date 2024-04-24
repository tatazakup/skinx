import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PostsSection } from "./PostSections";
import { FilterSection } from "./FilterSections";

export const SEARCH_BY = [
  { id: "title", title: "title" },
  { id: "tag", title: "tag" },
];

export const SORT_BY = [
  { id: "ASC", title: "ASC" },
  { id: "DESC", title: "DESC" },
];

const FilterSchema = z.object({
  page: z.number(),
  size: z.number(),
  sort: z.object({
    id: z.string(),
    title: z.string(),
  }),
  search: z.string(),
  searchBy: z.object({
    id: z.string(),
    title: z.string(),
  }),
});

export type FilterSchemaType = z.infer<typeof FilterSchema>;

export const PostPage = () => {
  const [state, setState] = useState(true);
  const filterSchema = useForm<FilterSchemaType>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      page: 0,
      size: 3,
      sort: SORT_BY[0],
      search: "",
      searchBy: SEARCH_BY[0],
    },
  });

  return (
    <Fragment>
      <FilterSection filterSchema={filterSchema} setState={setState} />
      <PostsSection
        filterSchema={filterSchema}
        state={state}
        setState={setState}
      />
    </Fragment>
  );
};
