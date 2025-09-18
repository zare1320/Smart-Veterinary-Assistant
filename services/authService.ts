// This is a mock authentication service to simulate API calls.
// signInWithGoogle is now a real implementation, but needs a real Client ID.

const MOCK_VALID_OTP = '123456';
const MOCK_DELAY = 1000; // 1 second delay

// IMPORTANT: Replace this with your actual Google Client ID from the Google Cloud Console.
const GOOGLE_CLIENT_ID = '545198098785-v7prfhkrbqor25rbaqcrd323ohiove9q.apps.googleusercontent.com';


export const authService = {
  /**
   * Simulates sending an OTP to a user's email or phone.
   * In a real app, this would call a backend endpoint.
   */
  sendOtp: (identity: string): Promise<void> => {
    console.log(`Simulating OTP send to ${identity}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`OTP sent. (Mocked - use ${MOCK_VALID_OTP})`);
        resolve();
      }, MOCK_DELAY);
    });
  },

  /**
   * Simulates verifying an OTP.
   * In a real app, this would call a backend endpoint.
   */
  verifyOtp: (identity: string, otp: string): Promise<boolean> => {
    console.log(`Simulating OTP verification for ${identity} with code ${otp}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (otp === MOCK_VALID_OTP) {
          console.log('OTP verified successfully.');
          resolve(true);
        } else {
          console.log('OTP verification failed.');
          resolve(false);
        }
      }, MOCK_DELAY);
    });
  },

  /**
   * Redirects the user to the Google Sign-In page for authentication.
   */
  signInWithGoogle: (): void => {
    // FIX: Removed the obsolete check for a placeholder GOOGLE_CLIENT_ID.
    // The constant already holds a value, and this check was causing a TypeScript
    // error because it was comparing two different string literals.
    const redirectUri = window.location.origin;
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

    authUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'token');
    authUrl.searchParams.append('scope', 'openid email profile');
    authUrl.searchParams.append('prompt', 'select_account');

    window.location.href = authUrl.toString();
  },

   /**
   * Handles the redirect back from Google Sign-In.
   * Parses the token from the URL hash, fetches user info, and returns the email.
   * Returns null if it's not a Google auth callback.
   * Throws an error if something goes wrong during token validation or user info fetching.
   */
  handleGoogleCallback: async (): Promise<string | null> => {
    if (!window.location.hash.includes('access_token')) {
        return null; // Not a Google callback
    }
      
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const error = params.get('error');

    // Clean the URL for a better user experience
    window.history.replaceState({}, document.title, window.location.pathname + window.location.search);

    if (error) {
        console.error(`Google Sign-In error: ${error}`);
        throw new Error(`Google Sign-In failed: ${error}`);
    }

    if (!accessToken) {
        return null;
    }

    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to fetch user info from Google:', errorData);
            throw new Error(`Failed to fetch user info. Status: ${response.status}`);
        }

        const userInfo = await response.json();
        
        if (!userInfo.email) {
            throw new Error('Email not found in Google user info.');
        }

        return userInfo.email;
    } catch (e) {
        console.error("Error handling Google callback:", e);
        throw e;
    }
  },
};