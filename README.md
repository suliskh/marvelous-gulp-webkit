# marvelous-gulp-webkit

> Build static web in a marvelous way, with [Gulp](https://gulpjs.com/)

*Gulp recipe for automating your static web development workflow. Transpile javascript, compile scss, add autoprefixer, concatinate javascript and css, optimize images, and auto-reload browser*
### Install
You need to have [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine. 
Then, install [gulp-cli](https://www.npmjs.com/package/gulp-cli) globally
```
$ npm install --global gulp-cli
```
Then, clone this repo
```
$ git clone https://github.com/kukuh-sulistyo/marvelous-gulp-webkit.git
```
Next, install node dependencies:
```
$ npm install
```

### Usage
**|** You should put HTML, stylesheets, javascripts, and images in 'src' folder. Example:

    ├── ...
    ├── src                   
    │   ├── styles
    │   │   ├── normalize.css
    │   │   └── main.scss     
    │   ├── scripts
    │   │   ├── main.js
    │   │   └── other.js
    │   ├── images   
    │   │    └── goat.png
    |   └── index.html
    └── ...
    
**|** You should put css and javascript references in build blocks
```html
...  
<!-- build:css css/bundle.css -->
<link rel="stylesheet" href="styles/normalize.css">
<link rel="stylesheet" href="styles/main.css">
<!-- endbuild -->
...    
<!-- build:js js/bundle.js -->
<script src="scripts/other.js"></script>
<script src="scripts/main.js"></script>
<!-- endbuild -->
...
```

**|** Playing around on local webserver with auto-reload
```
$ gulp play
```
It will automatically serving on your default browser [http://localhost:9000](http://localhost:9000)


**|** Build your static web
```
$ gulp build
```
Your super-marvelous-bundled-optimized web will be added to 'dist' folder

    ├── ...
    ├── dist                   
    │   ├── css
    │   │   └── bundle.css     
    │   ├── scripts
    │   │   └── bundle.js
    │   ├── images   
    │   │    └── goat.png
    |   └── index.html
    └── ...
