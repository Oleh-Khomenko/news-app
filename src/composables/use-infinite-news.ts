import { useInfiniteQuery } from '@tanstack/vue-query';

// api
import NewsApi from '@/api/news.api';

// constants
import { PAGE_SIZE } from '@/shared/constants/config.ts';

function useInfiniteNews() {
  return useInfiniteQuery({
    queryKey: ['news', 'infinite'],
    queryFn: ({ pageParam = 1 }) => NewsApi.getAll(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage) => lastPage.next,
    initialPageParam: 1,
  });
}

export default useInfiniteNews;
