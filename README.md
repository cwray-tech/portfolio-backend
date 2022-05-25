# Portfolio Backend for [chriswray.dev](https://chriswray.dev)

This is the backend for [my personal blog and portfolio website](https://chriswray.dev).

![Chris-Wray-Full-Stack-Engineer-Dreamer-Father-Husband-screenshot](https://user-images.githubusercontent.com/53663762/170277669-a70c5630-d42f-4054-b28e-ef9d33c02cdf.png)


## Installation Instructions

### **Clone the repo**

You can either fork this repo, then clone your forked version, or clone this repo directly. If you are planning to make this backend your own, and add features for your own portfolio, I would recommend forking and cloning your own version, that way you will be able to make prs to your own setup going forward.

### **In the directory you want your backend to be in:**

    git clone https://github.com/cwray-tech/portfolio-backend.git

### **Ensure your node version is set to a compatible version.**

Versions of Node supported: v12 or v14.
Using nvm:

    nvm use 12.5.0

### **Install your node dependencies**

cd into the application directory and install the node modules required.
Using Yarn:

    yarn

Using NPM:

    npm install

### **Create an env file.**

Copy the env.example file to .env, and add your environment configurations. The host and port do not need to be changed, but if you want to utilize Cloudinary for file uploads, and MongoDB for the database, you will need to create accounts on each of these platforms.

### **Create a Cloudinary account**

[Create a Cloudinary account](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/tyjytr506ffjmhjfqfui) and add your connection details to your newly created env file.
If you don't want to use Cloudinary
If you don't want to utilize Cloudinary for storage, update the config/plugins.js file settings for the upload plugin.
If you want to use local storage as your provider the upload settings should be updated to:

    upload: {
        providerOptions: {
          localServer: {
            maxage: 300000,
          },
        },
      },

### **Set up a MongoDB atlas cluster**

If you want to use MongoDB, follow the [getting started with Atlas guide](https://docs.atlas.mongodb.com/getting-started/?_ga=2.4563131.920976329.1643907102-735601706.1643758841&_gac=1.146756166.1643758841.Cj0KCQiA0eOPBhCGARIsAFIwTs76SnZs7BbvgidCHxu9fcxFSsj7MRSGdClsvvIRq1BXHWYC3rKDHMAaAt7uEALw_wcB#deploy-a-free-tier-cluster) and create a new database. You will need to create a database user, and get the connection URL from MongoDB, then add that URL to the env file you just created.

**A note on this.** There is no reason why you have to use MongoDB. In fact, if you are planning to upgrade your Strapi version to V4 in the future, I would recommend going with one of the other options, like SQLite, PostgreSQL, or MySQL.
If you want to switch Databases
Follow the [Strapi docs](https://docs-v3.strapi.io/developer-docs/latest/setup-deployment-guides/configurations.html#database) for configuring the database of your choice.

#### **If you want to use a simple SQLite database:**

In config/env/development/database.js and config/env/production update the database.js file to the following:

    module.exports = ({ env }) => ({
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "sqlite",
            filename: env("DATABASE_FILENAME", ".tmp/data.db"),
          },
          options: {
            useNullAsDefault: true,
          },
        },
      },
    });

### **Set up a SendGrid account**

In order to use the email plugin, set up a SendGrid account and add your SendGrid API key to the env file.

### **Start the server in development mode**

Using Yarn

    yarn dev

Using NPM

    npm run dev

### **Start development!**

The previous command will start a server on port 1337. You can visit the Strapi admin panel at http://localhost:1337/admin to get started.

## Permissions

One thing you will notice when you first build your app is that you will be unable to view your data from the URL publicly, and if you happened to also use the frontend portion of my portfolio, data will not be loaded when building the frontend.

This is because Strapi has a unique permissions format that is not set in the code base. The permission settings are saved to your database, so any permissions that I have changed do not apply to your app.

In order to properly update your permission settings so that your frontend will be able to fetch data from the API, you will need to set the permissions yourself.

**Step 1: Log in to the admin panel**

![](https://paper-attachments.dropbox.com/s_0E24F5CB60D4C9A933EA62407AD89004C7388AFD12663DC1688E2E8F0FCF79E4_1643928247896_Homepage.png)

**Step 2: Access the permissions settings**

![](https://paper-attachments.dropbox.com/s_0E24F5CB60D4C9A933EA62407AD89004C7388AFD12663DC1688E2E8F0FCF79E4_1643928256865_Settings+-+Application.png)

![](https://paper-attachments.dropbox.com/s_0E24F5CB60D4C9A933EA62407AD89004C7388AFD12663DC1688E2E8F0FCF79E4_1643928262567_Settings+-+Roles.png)

**Step 3: Update the settings for findOne and findMany to public**

![](https://paper-attachments.dropbox.com/s_0E24F5CB60D4C9A933EA62407AD89004C7388AFD12663DC1688E2E8F0FCF79E4_1643928270572_Settings.png)

**Step 4 Save the settings**

## Deployment

When you are ready to deploy your application, you will want to make sure to set up your environment configurations like you did in the env file and add yarn build as part of your deployment pipeline. Deploying this application is just like deploying any other Strapi V3 app, so you can follow their instructions for the service you want to use on the [Strapi doc website here](https://docs-v3.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).
