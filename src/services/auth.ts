import auth from '@react-native-firebase/auth';
import { GoogleSignin, SignInResponse, SignInSuccessResponse } from '@react-native-google-signin/google-signin';

export interface UserInfo {
    id: string;
    name: string | null;
    email: string | null;
    photo: string | null;
}

export async function signInWithGoogle(): Promise<UserInfo | null> {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const result: SignInResponse = await GoogleSignin.signIn();

        // ✅ Ensure it's a success response
        if ('data' in result && result.type === 'success') {
            const successResult = result as SignInSuccessResponse;
            const { idToken } = successResult.data;

            if (!idToken) {
                throw new Error('No ID token returned from Google Sign-In');
            }

            // Create Firebase credential
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign in with Firebase
            const userCredential = await auth().signInWithCredential(googleCredential);

            const { uid, displayName, email, photoURL } = userCredential.user;

            return {
                id: uid,
                name: displayName,
                email,
                photo: photoURL,
            };
        }

        // If canceled or error
        return null;
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        return null;
    }
}

export async function signOutFromGoogle(): Promise<void> {
    try {
        await GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error('Sign-Out Error:', error);
    }
}
