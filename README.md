This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to start

Instalar Cordova y Ionic

```bash
$ npm install -g cordova
$ npm install -g ionic
```

Si tuviera que crear un proyecto (aca template = tabs, podr?a ser blank, tutorial)

```bash
$ ionic start myTabsProject tabs
$ cd myTabsProject
```

### Para Geolocation:

Vamos a necesitar un Provider

```bash
$ ionic g provider MyProvider
```
No olvidar agregar el Provider en app.module !

Instalar los plugins necesarios:

```bash
$ ionic cordova plugin add cordova-plugin-geolocation
$ npm install --save @ionic-native/geolocation
$ ionic cordova plugin add cordova-plugin-mauron85-background-geolocation
$ npm install --save @ionic-native/background-geolocation
```

No olvidar agregarlos a todos estos en app.module !


### Correr Ionic

```bash
$ ionic serve
```

### Build & Run

Android:

```bash
$ ionic platform add android
$ ionic build android
$ ionic run android
```

iOS: To build for ios, you need to be using MacOs and have xCode installed.

```bash
$ npm install -g ios-deploy
$ npm install -g ios-sim version
$ ionic platform add ios
$ ionic build ios
$ ionic run ios
```

Windows: antes del build -> editar el config.xml para targetear Windows 10 (sino defaultea a W8)

<platform name="windows">
    <preference name="windows-target-version" value="10.0" />
</platform>

```bash
$ ionic platform add windows
$ ionic build windows
$ ionic run android
```
