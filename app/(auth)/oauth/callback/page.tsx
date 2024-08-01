import {
  AuthenticateWithRedirectCallback,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { RedirectToBase } from '@/lib/utils';

export default function OAuthCallbackPage() {
  return (
    <>
      <SignedIn>
        <RedirectToBase />
      </SignedIn>

      <SignedOut>
        <AuthenticateWithRedirectCallback />
      </SignedOut>
    </>
  );
}
