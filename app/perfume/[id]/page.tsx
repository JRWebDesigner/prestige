import { perfumes } from '@/data/perfumes';
import PerfumeDetails from './PerfumeDetails';

export async function generateStaticParams() {
  return perfumes.map((perfume) => ({
    id: perfume.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const perfume = perfumes.find(p => p.id === params.id);
  
  // Calcular perfumes relacionados en el servidor
  const relatedPerfumes = perfume 
    ? perfumes.filter(p => 
        p.id !== perfume.id && 
        (p.category === perfume.category || p.brand === perfume.brand)
      ).slice(0, 3)
    : [];

  return <PerfumeDetails perfume={perfume} relatedPerfumes={relatedPerfumes} />;
}

