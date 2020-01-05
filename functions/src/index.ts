import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const createUser = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    photoURL: user.photoURL,
    email: user.email,
    name: user.displayName,
    admin: false,
    registeredOn: Date.now()
  });
});

export const notifyUsersOfNewBlog = functions.firestore.document('blogs/{blog}').onCreate(async blog => {
  const data: any = blog.data();
  // gather tokens
  const tokens: any[] = [];
  const querySnapshot = await admin.firestore().collection('devices').get();

  querySnapshot.forEach(documentSnapshot => {
    tokens.push(documentSnapshot.id);
  });

  return admin.messaging().sendToDevice(tokens, {
    notification: {
      title: data.title,
      body: data.description
    },
    data: {
      redirectTo: '/blogs/' + blog.id
    }
  });
});
