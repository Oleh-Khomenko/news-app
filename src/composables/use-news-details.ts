import { useQuery } from '@tanstack/vue-query';

// models
import NewsApi from '@/api/news.api';

function useNewsDetails(id: number) {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => NewsApi.getById(id),
  });
}

export default useNewsDetails;
