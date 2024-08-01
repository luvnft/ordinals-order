import { redirect } from 'next/navigation';
import { routes } from '@/lib/routing';

export default function HomePage() {
  redirect(routes.bitcoin);
}
