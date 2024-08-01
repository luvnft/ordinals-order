import { meta } from '@/lib/metadata';
import { SignUpForm } from './sign-up-form';

export default function SignUpPage() {
  return <SignUpForm />;
}

export const metadata = meta({ subtitle: 'Sign-up' });
