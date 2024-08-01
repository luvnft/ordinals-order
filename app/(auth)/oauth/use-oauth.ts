import { useSignIn, useSignUp } from '@clerk/nextjs';
import { type OAuthStrategy } from '@clerk/types';
import { useState } from 'react';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { toast } from 'sonner';
import { routes } from '@/lib/routing';
import { errorToast } from '@/lib/utils';

export function useOAuth() {
  const { isLoaded: isClerkSignInLoaded, signIn } = useSignIn();

  const { isLoaded: isClerkSignUpLoaded, signUp, setActive } = useSignUp();

  const isLoaded = isClerkSignInLoaded && isClerkSignUpLoaded;

  const [isAuthenticatingWithOAuth, setIsAuthenticatingWithOAuth] =
    useState(false);

  const redirectToAuthenticate = async (strategy: OAuthStrategy) => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsAuthenticatingWithOAuth(true);

      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: routes.auth.oauth.callback,
        redirectUrlComplete: routes.base,
      });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        errorToast(error);
      }
    } finally {
      setIsAuthenticatingWithOAuth(false);
    }
  };

  const authenticateWithOAuth = async (strategy: OAuthStrategy) => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsAuthenticatingWithOAuth(true);

      // If the user has an app account, but does not yet have an OAuth account
      // connected to it, we transfer the OAuth account to the existing user app account
      const userExistsButNeedsToSignIn =
        signUp.verifications.externalAccount.status === 'transferable' &&
        signUp.verifications.externalAccount.error?.code ===
          'external_account_exists';

      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({
          transfer: true,
        });

        if (res.status === 'complete') {
          await setActive({
            session: res.createdSessionId,
          });
        }
      }

      // If the user has an OAuth account, but does not yet have an account in the app
      // we create a user app account for them using the OAuth information
      const userNeedsToBeCreated =
        signIn.firstFactorVerification.status === 'transferable';

      if (userNeedsToBeCreated) {
        const res = await signUp.create({
          transfer: true,
        });

        if (res.status === 'complete') {
          await setActive({
            session: res.createdSessionId,
          });
        }
      } else {
        // If the user has an app account and has an OAuth account
        // connected to it, we sign them in straightaway
        await redirectToAuthenticate(strategy);
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        errorToast(error);
      }
    } finally {
      setIsAuthenticatingWithOAuth(false);
    }
  };

  return {
    isAuthenticatingWithOAuth,
    authenticateWithOAuth,
  };
}
