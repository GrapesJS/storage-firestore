import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapesjs-firestore', (editor, opts = {}) => {
  const options = { ...{
    apiKey: '',

    authDomain: '',

    projectId: '',

    // Document id
    docId: 'gjs',

    collectionName: 'templates',

    // Databse settings
    settings: { timestampsInSnapshots: true },
  },  ...opts };

  const autoAdd = 1; // the id is generated on fly
  const sm = editor.StorageManager;

  const apiKey = options.apiKey;
  const authDomain = options.authDomain;
  const projectId = options.projectId;
  const dbSettings = options.settings;

  sm.add('firestore', {
    getDocId() {
      return options.docId || this.docId;
    },

    getCollection() {
      if (!this.collection) {
        firebase.initializeApp({ apiKey, authDomain, projectId });
        const db = firebase.firestore();
        db.settings(dbSettings);
        this.collection = db.collection(options.collectionName);
      }

      return this.collection;
    },

    getDoc() {
      const collection = this.getCollection();
      const id = this.getDocId();

      if (id) {
        return collection.doc(id);
      }
    },
    /**
     * Load the data
     * @param  {Array} keys Array containing values to load, eg, ['gjs-components', 'gjs-style', ...]
     * @param  {Function} clb Callback function to call when the load is ended
     */
    load(keys, clb, clbError) {
      const docRef = this.getDoc();

      if (docRef) {
        docRef.get()
        .then(doc => doc.exists && clb(doc.data()))
        .catch(clbError);
      }
    },

    /**
     * Store the data
     * @param  {Object} data Data object to store
     * @param  {Function} clb Callback function to call when the load is ended
     */
    store(data, clb, clbError) {
      const docRef = this.getDoc();

      if (docRef) {
        docRef.set(data)
        .then(clb)
        .catch(clbError);
      } else if (autoAdd) {
        const collection = this.getCollection();
        collection.add(data).then((docRef) => {
          this.docId = docRef.id;
          clb(docRef);
        }).catch(clbError);
      }
    }
  });
});
