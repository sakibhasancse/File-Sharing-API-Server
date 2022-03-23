<div align="center" id="top">

  <!-- <a href="https://File-Sharing-API-Server.netlify.app">Demo</a> -->
</div>

<h1 align="center">File-Sharing-API-Server</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/sakibhasancse/File-Sharing-API-Server?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/sakibhasancse/File-Sharing-API-Server?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/sakibhasancse/File-Sharing-API-Server?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/sakibhasancse/File-Sharing-API-Server?color=56BEB8">

  <img alt="Github issues" src="https://img.shields.io/github/issues/sakibhasancse/File-Sharing-API-Server?color=56BEB8" />

  <img alt="Github forks" src="https://img.shields.io/github/forks/sakibhasancse/File-Sharing-API-Server?color=56BEB8" />

   <img alt="Github stars" src="https://img.shields.io/github/stars/sakibhasancse/File-Sharing-API-Server?color=56BEB8" />
</p>

Status

<h4 align="center"> 
	🚧  File-Sharing-API-Server 🚀 Under construction...  🚧
</h4>

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="https://github.com/sakibhasancse" target="_blank">Author</a>
</p>

<br>

## :dart: About

Describe your project

## :sparkles: Features

:heavy_check_mark: User authentication system;\
:heavy_check_mark: File shearing;\
:heavy_check_mark: FIle upload and download file;

## :rocket: Technologies

The following tools were used in this project:

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Mongoose.js](https://mongoosejs.com/)
- [Multer](https://www.npmjs.com/package/multer)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Clone project

```bash
# Clone this project
$ git clone https://github.com/sakibhasancse/File-Sharing-API-Server

# Access
$ cd File-Sharing-API-Server

# The server will initialize in the <http://localhost:3000>

```

:Environment variable setup
```shell
PORT=3000
MONGO_DB_URL=mongodb://localhost:27017/fileStorageApi
#user auth  
USER_AUTH_JWT_SECRET=your secret
JWT_ACCESS_TOKEN_EXPIRE=60d
JWT_REFRESH_TOKEN_EXPIRE=1d

#file auth 
FILE_ACCESS_JWT_SECRET=your secret
FILE_EXPIRE=1d

#max file size - 2mb
MAX_FILE_SIZE=2 
#old file remove, 1d
REMOVE_MAX_AGED_FILE_TIME= 24 * 60 * 60 * 1000

#if you use auth service kip it false, otherwise use true
USE_DEMO_USER=false

#google cloud storage, under construction
#GOOGLE_CLOUD_PROJECT_ID
#GOOGLE_CLOUD_KEYFILE 
```

:Start project
```shell
# Install dependencies
$ yarn

# Run the project
$ yarn start

```
<!-- ## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file. -->

Made with :heart: by <a href="https://github.com/sakibhasancse" target="_blank">Sakib Hasan</a>

&#xa0;

<a href="#top">Back to top</a>
