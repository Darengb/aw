import { getNewsArticles } from '@/utils/content';
import NewsClient from './NewsClient';

export default function NewsPage() {
  const articles = getNewsArticles();
  return <NewsClient articles={articles} />;
}
