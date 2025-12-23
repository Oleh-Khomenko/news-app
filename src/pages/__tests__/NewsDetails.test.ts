import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

// api
import NewsApi from '../../api/news.api';

// components
import NewsDetails from '../NewsDetails.vue';

// mock API
vi.mock('@/api/news.api', () => ({
  default: {
    getById: vi.fn(),
  },
}));

// mock vue-router
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: { id: '1' },
  })),
  RouterLink: {
    template: '<a><slot /></a>',
  },
}));

// tests
describe('NewsDetails Page', () => {
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

  it('should load and display news details', async () => {
    const mockNewsDetails = {
      id: 1,
      title: 'Test News Article',
      author: 'John Doe',
      image: 'https://example.com/image.jpg',
      description: 'Test description',
      createdAt: Date.now(),
      content: [
        { type: 'paragraph' as const, text: 'This is a test paragraph.' },
        { type: 'quote' as const, text: 'This is a test quote.' },
      ],
    };

    vi.mocked(NewsApi.getById).mockResolvedValue(mockNewsDetails);

    const wrapper = mount(NewsDetails, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain('Test News Article');
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('This is a test paragraph.');
    expect(wrapper.text()).toContain('This is a test quote.');
  });

  it('should show loading skeleton when data is loading', async () => {
    vi.mocked(NewsApi.getById).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const wrapper = mount(NewsDetails, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    const skeletons = wrapper.findAllComponents({ name: 'Skeleton' });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should call API with correct news ID', async () => {
    const mockNewsDetails = {
      id: 1,
      title: 'Test News',
      author: 'John Doe',
      image: 'https://example.com/image.jpg',
      description: 'Test',
      createdAt: Date.now(),
      content: [],
    };

    vi.mocked(NewsApi.getById).mockResolvedValue(mockNewsDetails);

    mount(NewsDetails, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    await flushPromises();

    expect(NewsApi.getById).toHaveBeenCalledWith(1);
  });

  it('should render different content types correctly', async () => {
    const mockNewsDetails = {
      id: 1,
      title: 'Test News',
      author: 'John Doe',
      image: 'https://example.com/image.jpg',
      description: 'Test',
      createdAt: Date.now(),
      content: [
        { type: 'paragraph' as const, text: 'Paragraph content' },
        { type: 'quote' as const, text: 'Quote content' },
        { type: 'image' as const, url: 'https://example.com/content.jpg', alt: 'Content image' },
      ],
    };

    vi.mocked(NewsApi.getById).mockResolvedValue(mockNewsDetails);

    const wrapper = mount(NewsDetails, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    await flushPromises();

    const article = wrapper.find('.article-content');
    expect(article.text()).toContain('Paragraph content');
    expect(article.find('blockquote').text()).toContain('Quote content');

    const images = wrapper.findAllComponents({ name: 'Image' });
    expect(images.length).toBeGreaterThan(0);
  });
});
