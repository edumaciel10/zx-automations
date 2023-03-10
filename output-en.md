---
id: plugin
title: plugin
tags:
- plugin
---
OpenPix has 2 plugins to be used in your business, the `Order` Plugin and the `Widget` Plugin.

## What do I need to know before using the plugins?

- It is necessary to understand that to use the API's and plugins available within OpenPix you need to have a valid AppID, see how to create [here](./app-id).

- When trying to consume the plugin to create a charge, you need to generate a unique correlationID, to be able to search for this charge within OpenPix, if you do not inform a new correlationID for a new charge, the previous charge related to this correlationID will be shown

## Getting Started with the `Widget` Plugin

The `Widget` Plugin allows you to easily create Pix charges within your Javascript frontend.
And it should be used when the charge still needs to be created in OpenPix.

### Creating the `Widget` Plugin

The first thing is to include the OpenPix plugin script tag at the bottom of the html file

```html
<script src="https://plugin.openpix.com.br/v1/openpix.js" async>
```

The script can be imported into an `.html` file. For example, if your app is a React app, the OpenPix Plugin script will be imported inside `index.html`.

See the example below:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>OpenPix Plugin Demo</title>
</head>
<body>
<div id="root"></div>
<script src="https://plugin.openpix.com.br/v1/openpix.js" async></script>
</body>
</html>
```

Until this moment, nothing should happen, as the plugin has not been initialized.
To confirm that the plugin was initialized correctly, you can access your browser console and look for these logs

```
[OpenPix] connecting, attemp 0
[OpenPix] connected
```
