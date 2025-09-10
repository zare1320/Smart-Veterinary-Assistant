// This is a mock authentication service to simulate API calls.

const MOCK_VALID_OTP = '123456';
const MOCK_DELAY = 1000; // 1 second delay

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
   * Simulates signing in with a Google account.
   * In a real app, this would use a library like Firebase Auth or Google Identity Services.
   */
  signInWithGoogle: (): Promise<{ email: string }> => {
    console.log('Simulating Google Sign-In...');
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          email: 'vet.demo@gmail.com',
        };
        console.log(`Google Sign-In successful for ${mockUser.email}`);
        resolve(mockUser);
      }, MOCK_DELAY);
    });
  },
};