// helpers
import sleep from '@/utils/sleep.ts';

// models
import type { NewsDetails, NewsPreview } from '@/shared/models/news-details';
import type { PaginatedResponse } from '@/shared/models/paginated-response';

// constants
import { PAGE_SIZE } from '@/shared/constants/config.ts';

// custom constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NewsApi = {
  async getAll(page = 1, perPage = PAGE_SIZE): Promise<PaginatedResponse<NewsPreview>> {
    const response = await fetch(`${API_BASE_URL}/news?_page=${page}&_per_page=${perPage}`);

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const result = await response.json();
    await sleep(500);

    // Simulate fetching list with short data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = result.data.map(({ content, ...preview }: NewsDetails) => preview);

    return {
      ...result,
      data,
    };
  },

  async getById(id: number): Promise<NewsDetails> {
    const response = await fetch(`${API_BASE_URL}/news/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch news with id ${id}`);
    }

    await sleep(1000);
    return response.json();
  }
}

export default NewsApi;
