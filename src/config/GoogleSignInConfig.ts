import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn(): void {
  GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // from Firebase Console
    offlineAccess: true, // enable if you need server-side access
    forceCodeForRefreshToken: true, // recommended for Firebase
  });
}
