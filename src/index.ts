import type grapesjs from 'grapesjs';
import type Firebase from 'firebase';

declare const firebase: typeof Firebase;

export type PluginOptions = {
  /**
   * Type id used to register the new storage.
   * You can use this option in case you want to replace the already available storages (eg. `remote`).
   * @default 'firestore'
   */
  type?: string,

  /**
   * Firebase API key
   */
  apiKey: string,

  /**
  * Firebase Auth domain
  */
  authDomain: string,

  /**
  * Cloud Firestore project ID
  */
  projectId: string,

  /**
  * Document id
  * @default 'gjs'
  */
  docId?: string,

  /**
  * Collection name
  * @default 'projects'
  */
  collectionName?: string,

  /**
  * Enable support for offline data persistence
  * @default true
  */
  enableOffline?: boolean,

  /**
  * Firestore settings (https://firebase.google.com/docs/reference/js/firebase.firestore.Settings)
  */
  settings?: Firebase.firestore.Settings,
};

const plugin: grapesjs.Plugin<PluginOptions> = (editor, opts) => {
  const options: PluginOptions = {
    type: 'firestore',
    docId: 'gjs',
    collectionName: 'projects',
    enableOffline: true,
    settings: {},
    ...opts,
  };

  const sm = editor.StorageManager;
  const storageName = options.type!;

  let dbRef: Firebase.firestore.Firestore;
  let docRef: Firebase.firestore.DocumentReference<Firebase.firestore.DocumentData>;
  let collectionRef: Firebase.firestore.CollectionReference<Firebase.firestore.DocumentData>;
  let docId = opts.docId!;

  const getDocRef = async () => {
    if (docRef) return docRef;

    if (!dbRef) {
      firebase.initializeApp({
        apiKey: options.apiKey,
        authDomain: options.authDomain,
        projectId: options.projectId,
      });

      dbRef = firebase.firestore();
      dbRef.settings(options.settings!);

      if (opts.enableOffline) {
        await dbRef.enablePersistence();
      }
    }

    if (!collectionRef) {
      collectionRef = dbRef.collection(opts.collectionName!);
    }

    docRef = collectionRef.doc(docId);
    return docRef;
  }

  sm.add(storageName, {
    async load() {
      const doc = await getDocRef();
      const result = await doc.get();
      return (result.exists ? result.data() : {}) as grapesjs.ProjectData;
    },

    async store(data) {
      const doc = await getDocRef();
      await doc.set(data);
    },

    getDoc: () => docRef,

    getDocId: () => docId,

    setDocId(id: string) {
      docId = id;
      docRef = collectionRef.doc(docId);
    },
  });
};

export default plugin;
