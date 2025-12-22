export interface NewsPreview {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  category?: string;
  createdAt: number;
}

export interface NewsDetails extends NewsPreview {
  content: NewsContentItem[];
}

export type NewsContentItem =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; url: string; alt?: string };

