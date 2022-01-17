# POAP Mobile app dynamic image API

Endpoint the mobile app can use to show different images dynamically.

## Calling the endpoint

The API has one endpoint that can only be approached via `GET` request: `https://storage.googleapis.com/mobile-app-dynamic-image.appspot.com/api/poap_images.json`.

The output conforms to the following:

```js

{
	"meta": {
		"updated": Number, // Javascript timestamp
		"updated_human": String // Human readable version of above timestamp
	},

	// The images will be a key/array combination of app locations and an array of available images
	String: Array

	// Examples:
	// header: [ 'https://poap.xyz/header1.svg', 'https://poap.xyz/header2.png' ],
	// footer: [ 'https://poap.xyz/footer1.png', 'https://poap.xyz/footer2.svg' ]

}

```

## Editing the images

Images can be added and removed through the Firebase Console under [storage > files > mobile_app_images]( https://console.firebase.google.com/u/0/project/mobile-app-dynamic-image/storage/mobile-app-dynamic-image.appspot.com/files/~2Fmobile_app_images ).

Any folder under `mobile_app_images` will result in a key in the API response. For example to achieve the API response above, create the below file structure:

```shell
/
	/mobile_app_images/

		/header/
			header1.svg
			header2.jpg

		/footer/
			footer1.png
			footer2.svg

	/api/
		🛑 No not touch this folder

```

When you upload new files, the API json file will be automatically updated, the only action you need to take is to upload new files. You may verify that everything works as you expect by [opening the public API link in the browser]( https://storage.googleapis.com/mobile-app-dynamic-image.appspot.com/api/poap_images.json ).
