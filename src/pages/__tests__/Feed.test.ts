import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

// api
import NewsApi from '../../api/news.api';

// components
import Feed from '../Feed.vue';

// mock Api
vi.mock('@/api/news.api', () => ({
  default: {
    getAll: vi.fn(),
  },
}));

// mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// tests
describe('Feed Page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  it('should load and display news items', async () => {
    const mockNews = {
      data: [
        {
          id: 1,
          title: 'Test News 1',
          author: 'John Doe',
          image: 'https://example.com/image1.jpg',
          description: 'Test description 1',
          createdAt: Date.now(),
        },
        {
          id: 2,
          title: 'Test News 2',
          author: 'Jane Smith',
          image: 'https://example.com/image2.jpg',
          description: 'Test description 2',
          createdAt: Date.now(),
        },
      ],
      first: 1,
      items: 2,
      last: 1,
      next: null,
      pages: 1,
      prev: null,
    };

    vi.mocked(NewsApi.getAll).mockResolvedValue(mockNews);

    const wrapper = mount(Feed, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
        stubs: {
          RouterLink: true,
        },
      },
    });

    await flushPromises();

    const newsCards = wrapper.findAllComponents({ name: 'NewsCard' });
    expect(newsCards).toHaveLength(2);
    expect(wrapper.text()).toContain('Last news');
  });

  it('should show loading skeletons when data is loading', async () => {
    vi.mocked(NewsApi.getAll).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const wrapper = mount(Feed, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
        stubs: {
          RouterLink: true,
        },
      },
    });

    const skeletons = wrapper.findAllComponents({ name: 'NewsCardSkeleton' });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should call API with correct parameters', async () => {
    const mockNews = {
      data: [],
      first: 1,
      items: 0,
      last: 1,
      next: null,
      pages: 1,
      prev: null,
    };

    vi.mocked(NewsApi.getAll).mockResolvedValue(mockNews);

    mount(Feed, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
        stubs: {
          RouterLink: true,
        },
      },
    });

    await flushPromises();

    expect(NewsApi.getAll).toHaveBeenCalledWith(1, expect.any(Number));
  });
});
