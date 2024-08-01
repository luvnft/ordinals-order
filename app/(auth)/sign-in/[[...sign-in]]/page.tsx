import { meta } from '@/lib/metadata';
import { SignInForm } from './sign-in-form';

export default function SignInPage() {
  return <SignInForm />;
}

export const metadata = meta({ subtitle: 'Sign-in' });
