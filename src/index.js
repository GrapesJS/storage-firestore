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

    // Database settings (https://firebase.google.com/docs/reference/js/firebase.firestore.Settings)
    settings: { timestampsInSnapshots: true },
  },  ...opts };

  const sm = editor.StorageManager;
  const storageName = 'firestore';

  let db;
  let doc;
  let docId;
  let collection;
  const apiKey = options.apiKey;
  const authDomain = options.authDomain;
  const projectId = options.projectId;
  const dbSettings = options.settings;
  const onError = err => sm.onError(storageName, err.code || err);

  const getDoc = () => doc;
  const getDocId = () => docId || options.docId;

  const getAsyncCollection = (clb) => {
    if (collection) return clb(collection);
    firebase.initializeApp({ apiKey, authDomain, projectId });
    const fs = firebase.firestore();
    fs.settings(dbSettings);

    const callback = () => {
      db = firebase.firestore();
      collection = db.collection(options.collectionName);
      clb(collection);
    }

    if (options.enableOffline) {
      fs.enablePersistence().then(callback).catch(onError);
    } else {
      callback();
    }
  };

  const getAsyncDoc = (clb) => {
    getAsyncCollection(cll => {
      doc = cll.doc(getDocId());
      clb(doc);
    });
  };

  sm.add(storageName, {
    getDoc,

    getDocId,

    setDocId(id) {
      docId = id;
    },

    load(keys, clb, clbError) {
      getAsyncDoc(doc => {
        doc.get()
        .then(doc => doc.exists && clb(doc.data()))
        .catch(clbError);
      });
    },

    store(data, clb, clbError) {
      getAsyncDoc(doc => {
        doc.set(data)
        .then(clb)
        .catch(clbError);
      });
    }
  });
});
