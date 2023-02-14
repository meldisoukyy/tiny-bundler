# Tiny Bundler

> A tiny javascript bundler, which implement the basic idea of tools like [Webpack](https://github.com/webpack/webpack "Webpack Github Repo"), and [Parcel](https://github.com/parcel-bundler/parcel "Parcel Github Repo").

### Introduction

The main purpose of this project is to explain how most bundlers work under the hood.

### Installing

Start by cloning this repo in your local machine then change you working directory to be in tiny-bundler.

```shell
git clone git@github.com:meldisoukyy/tiny-bundler.git
cd tiny-bundler
```

Then, install dependencies.

```shell
npm install
```

### Configurations

Firstly, create a file called `bundle.config.json` .

```shell
touch bundle.config.json
```

Your config file should have the following content.

```json
{
	"entry": "./path-to-your-entry-file",
	"output": {
		"path": "./path-to-your-output-dir",
		"fileneame": "your-output-filename"
	}
}
```

> Note: you have to explicity mention your entry file, but adding output property is optional.
>
> if output is not exists, the defauld output file will be `./dist/bundle.js` .

### Try out the code

Override `bundle.config.json` file with the following data:

```json
{
	"entry": "./examples/about_author/entry.js",
	"output": {
		"path": "./dist",
		"fileneame": "output.js"
	}
}
```

Secondly run the program with `npm start`. Then copy the content of `./dist/output.js` and run it in your browser console.

### Additional Resources

These are some awesome resources that can help you to get more information:

* [minipack](https://github.com/ronami/minipack).
* [[youtube video](https://www.youtube.com/watch?v=UNMkLHzofQI "Webpack founder Tobias Koppers demos bundling live by hand")] Webpack founder Tobias Koppers demos bundling live by hand.
