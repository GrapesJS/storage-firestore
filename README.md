# GrapesJS Firestore

GrapesJS storage wrapper for [Cloud Firestore](https://firebase.google.com/docs/firestore), flexible, scalable NoSQL cloud database to store and sync data for client/server-side development.


## Summary

* Plugin name: `grapesjs-firestore`
* Components
  * `new-component1`
  * `new-component2`
* Blocks
  * `new-block1`
  * `new-block1`
...





## Options

|Option|Description|Default|
|-|-|-
|`option1`|Description option|`default value`|





## Download

* CDN
  * `https://unpkg.com/grapesjs-firestore`
* NPM
  * `npm i grapesjs-firestore`
* GIT
  * `git clone https://github.com/YOUR-NAME/grapesjs-firestore.git`





## Usage

- Open the [Firebase Console](https://console.firebase.google.com) and create a new project.
- In the Database section, click Try Firestore Beta.
- When you create a Firestore project, it also enables its API, which you can get from [Cloud API Manager](https://console.cloud.google.com/projectselector/apis/api/firestore.googleapis.com/overview)

```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-firestore.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
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
$ git clone https://github.com/YOUR-NAME/grapesjs-firestore.git
$ cd grapesjs-firestore
```

Install dependencies

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
