import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapesjs-firestore', (editor, opts = {}) => {
  const options = { ...{
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

  },  ...opts };

  const sm = editor.StorageManager;
  const storageName = 'firestore';

  let docId = options.docId;

  const apiKey = options.apiKey;
  const authDomain = options.authDomain;
  const projectId = options.projectId;
  const onError = err => sm.onError(storageName, err.code || err);

  const getDoc = () => doc;

  firebase.initializeApp({ apiKey, authDomain, projectId });
  const fs = firebase.firestore();

  if (options.enableOffline) {
    fs.enablePersistence().catch(onError);
  }

  const db = firebase.firestore();
  const collection = db.constructor(options.collectionName);
  let doc = collection.doc(getDocId());

  sm.add(storageName, {
    getDoc,
    getDocId: () => docId,

    setDocId(id) {
      docId = id;
      doc = collection.doc(docId);
    },

    load(keys, clb, clbError) {
      doc.get()
      .then(doc => doc.exists && clb(doc.data()))
      .catch(clbError);
    },

    store(data, clb, clbError) {
      doc.set(data)
      .then(clb)
      .catch(clbError);
    }
  });
});
