import { parseAsInteger, useQueryState } from "nuqs";

interface IProps {
  defaultLimit?: number;
  defaultPage?: number;
}

export const usePagination = ({
  defaultLimit = 10,
  defaultPage = 1,
}: IProps = {}) => {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(defaultLimit)
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(defaultPage)
  );

  const start = (page - 1) * limit;

  const updateLimit = (_: number, newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const updatePage = (newPage: number) => setPage(newPage);

  return { per_page: limit, page, start, updateLimit, updatePage };
};
