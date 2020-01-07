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

export const addQRPoints = functions.firestore.document('QRCodes/{QRCode}').onCreate(async code => {
  const data: any = code.data();
  // check if code is valid
  const querySnapshot = await admin.firestore().collection('validQRCodes').where('code', '==', data.code).get();
  if (!querySnapshot.empty) {
    // check if already scanned
    const qrCodeSnapshot = await admin.firestore().collection('QRCodes')
      .where('code', '==', data.code)
      .where('scannedBy', '==', data.scannedBy)
      .get();
    if (qrCodeSnapshot.size === 1) {
      const userDocument = await admin.firestore().doc('users/' + data.scannedBy).get();
      let points = userDocument.get('points');
      if (points === undefined) {
        points = 1;
      }
      else {
        ++points;
      }
      // update user
      await admin.firestore().doc('users/' + data.scannedBy).update({
        points
      });
    }
  }
});
