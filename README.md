# GrapesJS Firestore

GrapesJS storage wrapper for [Cloud Firestore](https://firebase.google.com/docs/firestore), flexible, scalable NoSQL cloud database to store and sync data for client/server-side development.

> Requires GrapesJS v0.19.* or higher


## Summary

* Plugin name: `grapesjs-firestore`
* Storage
  * `firestore`





## Options

|Option|Description|Default|
|-|-|-
| `type` | Type id used to register the new storage. You can use this option in case you want to replace the already available storages (eg. `remote`). | `'firestore'` |
| `apiKey` | Firebase API key | `''` |
| `authDomain` | Firebase Auth domain | `''` |
| `projectId` | Cloud Firestore project ID | `''` |
| `docId` | Document id | `'gjs'` |
| `collectionName` | Collection name | `'projects'` |
| `enableOffline` | Enable support for offline data persistence | `true` |
| `settings` | Firestore database [settings](https://firebase.google.com/docs/reference/js/firebase.firestore.Settings) | `{ timestampsInSnapshots: true }` |





## Download

* CDN
  * `https://unpkg.com/grapesjs-firestore`
* NPM
  * `npm i grapesjs-firestore`
* GIT
  * `git clone https://github.com/GrapesJS/storage-firestore.git`





## Usage

Before start using this plugin you have to create and enable Cloud Firestore project in [Firebase Console](https://console.firebase.google.com). When you create a Firestore project, it also enables its API, which you can get from [Cloud API Manager](https://console.cloud.google.com/projectselector/apis/api/firestore.googleapis.com/overview).

```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-firestore.min.js"></script>

<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
      storageManager: { type: 'firestore' },
      plugins: ['grapesjs-firestore'],
      pluginsOpts: {
        'grapesjs-firestore': {
          docId: 'someID',
          apiKey: '<API_KEY>',
          authDomain: '<PROJECT_ID>.firebaseapp.com',
          projectId: '<PROJECT_ID>',
        }
      }
  });
</script>
```

By default, Firebase allows everyone to read/write data inside your DB by knowing the API credentials, which is ok for the first setup and development but, obviously, not for production.
To get more about the Firestore security checkout [this guide](https://firebase.google.com/docs/firestore/security/overview).




## Development

Clone the repository

```sh
$ git clone https://github.com/GrapesJS/storage-firestore.git
$ cd grapesjs-firestore
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
