import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapesjs-firestore', (editor, opts = {}) => {
  const options = {
    // Firebase API key
    apiKey: '',

    // Firebase Auth domain
    authDomain: '',

    // Cloud Firestore project ID
    projectId: '',

    // Document id
    docId: 'gjs',

    // Collection name
    collectionName: 'templates',

    // Enable support for offline data persistence
    enableOffline: true,

    // Database settings (https://firebase.google.com/docs/reference/js/firebase.firestore.Settings)
    settings: {},
    ...opts };

  const storageName = 'firestore';

  let docId = options.docId;

  firebase.initializeApp({
    apiKey: options.apiKey,
    authDomain: options.authDomain,
    projectId: options.projectId,
  });

  const db = firebase.firestore();
  db.settings(options.settings);

  if (options.enableOffline) {
    db.enablePersistence().catch(error => editor.StorageManager.onError(storageName, error.code || error));
  }

  const collectionRef = db.constructor(options.collectionName);
  let docRef = collectionRef.doc(docId);

  editor.StorageManager.add(storageName, {
    getDoc: () => docRef,
    getDocId: () => docId,

    setDocId(id) {
      docId = id;
      docRef = collectionRef.doc(docId);
    },

    load(keys, callback, errorCallback) {
      docRef.get()
      .then(doc => doc.exists && callback(doc.data()))
      .catch(errorCallback);
    },

    store(data, callback, errorCallback) {
      docRef.set(data)
      .then(callback)
      .catch(errorCallback);
    }
  });
});
