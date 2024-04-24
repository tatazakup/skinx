import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MainAxios } from "@configs/apis/main";
import { createQueryFn } from "./utils";

const mappingPostKeys = {
  post: ["post"] as const,
  paginate: (params: PaginateProps) => [...mappingPostKeys.post, params],
  datail: (id: number) => [...mappingPostKeys.post, id],
};

type PaginateProps = {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  searchBy?: string;
};

export const usePosts = (
  paginate: PaginateProps,
  options?: UseQueryOptions<
    unknown,
    unknown,
    {
      totalItems: number;
      items: {
        id: number;
        title: string;
        content: string;
        postedAt: string;
        postedBy: string;
        tags: string[];
      }[];
      totalPages: number;
      currentPage: number;
    }
  >
) => {
  return useQuery({
    queryKey: mappingPostKeys.paginate(paginate),
    queryFn: ({ queryKey }) => {
      return createQueryFn(MainAxios, queryKey).then((res) => res);
    },
    ...options,
  });
};
