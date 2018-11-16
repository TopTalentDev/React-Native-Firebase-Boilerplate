import { AuthCredential } from "react-native-firebase";
//React Native Firebase doesn't seem to export these interfaces/types, so added them here
export type UserMetadata = {
  creationTime?: string;
  lastSignInTime?: string;
};

export type UserInfo = {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  uid: string;
};

export type IdTokenResult = {
  token: string;
  authTime: string;
  issuedAtTime: string;
  expirationTime: string;
  signInProvider: null | string;
  claims: {
    [key: string]: any;
  };
};

export type AdditionalUserInfo = {
  isNewUser: boolean;
  profile?: Object;
  providerId: string;
  username?: string;
};

export type UserCredential = {
  additionalUserInfo?: AdditionalUserInfo;
  user: User;
};

export type ActionCodeSettings = {
  android: {
    installApp?: boolean;
    minimumVersion?: string;
    packageName: string;
  };
  handleCodeInApp?: boolean;
  iOS: {
    bundleId?: string;
  };
  url: string;
};

export type UpdateProfile = {
  displayName?: string;
  photoURL?: string;
};

export interface User {
  /**
   * The user's display name (if available).
   */
  displayName: string | null;
  /**
   * - The user's email address (if available).
   */
  email: string | null;
  /**
   * - True if the user's email address has been verified.
   */
  emailVerified: boolean;
  /**
   *
   */
  isAnonymous: boolean;

  metadata: UserMetadata;

  phoneNumber: string | null;
  /**
   * - The URL of the user's profile picture (if available).
   */
  photoURL: string | null;
  /**
   * - Additional provider-specific information about the user.
   */
  providerData: Array<UserInfo>;
  /**
   *  - The authentication provider ID for the current user.
   *  For example, 'facebook.com', or 'google.com'.
   */
  providerId: string;
  /**
   *  - The user's unique ID.
   */
  uid: string;

  /**
   * Delete the current user.
   */
  delete(): Promise<void>;

  /**
   * Returns the users authentication token.
   *
   * @param forceRefresh: boolean - default to false
   */
  getIdToken(forceRefresh?: boolean): Promise<string>;

  /**
   * Returns a firebase.auth.IdTokenResult object which contains the ID token JWT string and
   * other helper properties for getting different data associated with the token as well as
   * all the decoded payload claims.
   *
   * @param forceRefresh boolean Force refresh regardless of token expiration.
   */
  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;

  /**
   * @deprecated
   * @param credential
   */
  linkAndRetrieveDataWithCredential(
    credential: AuthCredential
  ): Promise<UserCredential>;

  /**
   * Link the user with a 3rd party credential provider.
   */
  linkWithCredential(credential: AuthCredential): Promise<UserCredential>;

  /**
   * @deprecated
   * @param credential
   */
  reauthenticateAndRetrieveDataWithCredential(
    credential: AuthCredential
  ): Promise<UserCredential>;

  /**
   * Re-authenticate a user with a third-party authentication provider
   */
  reauthenticateWithCredential(credential: AuthCredential): Promise<UserCredential>;

  /**
   * Refreshes the current user.
   */
  reload(): Promise<void>;

  /**
   * Sends a verification email to a user.
   * This will Promise reject is the user is anonymous.
   */
  sendEmailVerification(
    actionCodeSettings?: ActionCodeSettings
  ): Promise<void>;

  toJSON(): object;

  unlink(providerId: string): Promise<User>;

  /**
   * Updates the user's email address.
   * See Firebase docs for more information on security & email validation.
   * This will Promise reject is the user is anonymous.
   */
  updateEmail(email: string): Promise<void>;

  /**
   * Important: this is a security sensitive operation that requires the user to have recently signed in.
   * If this requirement isn't met, ask the user to authenticate again and then call firebase.User#reauthenticate.
   * This will Promise reject is the user is anonymous.
   */
  updatePassword(password: string): Promise<void>;

  /**
   * Updates the user's phone number.
   * See Firebase docs for more information on security & email validation.
   * This will Promise reject is the user is anonymous.
   */
  updatePhoneNumber(credential: AuthCredential): Promise<void>;

  /**
   * Updates a user's profile data.
   * Profile data should be an object of fields to update:
   */
  updateProfile(updates: UpdateProfile): Promise<void>;
}