import { perfumes } from '@/data/perfumes';
import PerfumeDetails from './PerfumeDetails';

export async function generateStaticParams() {
  return perfumes.map((perfume) => ({
    id: perfume.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <PerfumeDetails />;
}

