import { SlideForm } from '@/components/admin/slide-form';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditSlidePage({ params }: PageProps) {
  return <SlideForm slideId={params.id} />;
}
