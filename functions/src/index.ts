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

export const notifyUsersOfNewBlog = functions.firestore.document('blogs/{blog}').onCreate(blog => {
  const data: any = blog.data();
  return admin.messaging().send({
    data: {
      title: data.title,
      description: data.description
    },
    topic: 'blogs'
  })
});
