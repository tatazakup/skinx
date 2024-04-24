import { usePosts } from "@apis/post";
import { Typography } from "@components/Typography/Typography";
import { Fragment, useEffect } from "react";
import parse from "html-react-parser";
import { FilterSchemaType } from "./PostPage";
import { UseFormReturn } from "react-hook-form";

type PostsSectionProps = {
  filterSchema: UseFormReturn<FilterSchemaType>;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsSection = (props: PostsSectionProps) => {
  const { getValues } = props.filterSchema;
  const { data: posts } = usePosts(
    {
      page: getValues("page"),
      size: getValues("size"),
      sort: getValues("sort.title"),
      search: getValues("search"),
      searchBy: getValues("searchBy.title"),
    },
    {
      enabled: props.state,
    }
  );

  useEffect(() => {
    if (!posts) {
      props.setState(false);
    }
  }, [posts]);

  return (
    <table className="absolute top-24">
      <thead>
        <tr>
          <th>
            <Typography>Title</Typography>
          </th>
          <th>
            <Typography>PostedAt</Typography>
          </th>
          <th>
            <Typography>PostedBy</Typography>
          </th>
          <th>
            <Typography>Tags</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {posts?.items.map((item, index) => {
          return (
            <Fragment key={index}>
              <tr>
                <td>{item.title}</td>
                <td>{item.postedAt}</td>
                <td>{item.postedBy}</td>
                <td>{item.tags[0] !== null ? item.tags.join(",") : " - "}</td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <hr />
                </td>
              </tr>
              <tr>
                <td colSpan={5}>{parse(item.content)}</td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <hr />
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
