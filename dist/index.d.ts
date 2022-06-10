import Firebase from 'firebase';
import grapesjs from 'grapesjs';

export declare type PluginOptions = {
	/**
	 * Type id used to register the new storage.
	 * You can use this option in case you want to replace the already available storages (eg. `remote`).
	 * @default 'firestore'
	 */
	type?: string;
	/**
	 * Firebase API key
	 */
	apiKey: string;
	/**
	* Firebase Auth domain
	*/
	authDomain: string;
	/**
	* Cloud Firestore project ID
	*/
	projectId: string;
	/**
	* Document id
	* @default 'gjs'
	*/
	docId?: string;
	/**
	* Collection name
	* @default 'projects'
	*/
	collectionName?: string;
	/**
	* Enable support for offline data persistence
	* @default true
	*/
	enableOffline?: boolean;
	/**
	* Firestore settings (https://firebase.google.com/docs/reference/js/firebase.firestore.Settings)
	*/
	settings?: Firebase.firestore.Settings;
};
declare const plugin: grapesjs.Plugin<PluginOptions>;

export {
	plugin as default,
};

export {};
