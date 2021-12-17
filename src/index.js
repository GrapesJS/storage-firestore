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
    ...opts };

  const storageName = 'firestore';

  let docId = options.docId;

  const apiKey = options.apiKey;
  const authDomain = options.authDomain;
  const projectId = options.projectId;

  const getDoc = () => doc;

  firebase.initializeApp({ apiKey, authDomain, projectId });
  const fs = firebase.firestore();

  if (options.enableOffline) {
    fs.enablePersistence().catch(error => editor.StorageManager.onError(storageName, error.code || error));
  }

  const db = firebase.firestore();
  const collectionRef = db.constructor(options.collectionName);
  let docRef = collectionRef.doc(docId);

  editor.StorageManager.add(storageName, {
    getDoc,
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
