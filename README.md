# create Cloudant NoSQL db 
using ```ibmcloud``` run following commands
```
ibmcloud resource service-instance-create microsrv-db cloudantnosqldb lite eu-de  -p '{"legacyCredentials":true}'
```
check the status of the provisioned service
```
resource service-instances 
```
create serwice creadentials
```
ibmcloud resource service-key-create microsrv-db-creds Manager --instance-name microsrv-db
```
record following values ```apikey, host, iam_apikey_name, iam_role_crn, iam_serviceid_crn, password, port, url, username```
useing following command:
```
ibmcloud resource service-key microsrv-db-creds
```
create JSON formatted file named ```vcap-local.json```
```
{
  "services": {
    "cloudantNoSQLDB": [
      {
        "credentials": {
            "apikey": "<VALUE>",
            "host": "<VALUE>",
            "iam_apikey_description": "<VALUE>",
            "iam_apikey_name": "<VALUE>",
            "iam_role_crn": "<VALUE>",
            "iam_serviceid_crn": "<VALUE>",
            "password": "<VALUE>",
            "port": <VALUE>,
            "url": "<VALUE>",
            "username": "<VALUE>"
          },
        "label": "cloudantNoSQLDB"
      }
    ]
  }
}
```

# Node.js getting started application
The Getting Started tutorial for Node.js uses this sample application to provide you with a sample workflow for working with any Node.js app on IBM Cloud or in IBM Cloud Private; you set up a development environment, deploy an app locally and on the cloud, and then integrate a IBM Cloud database service in your app.

The Node.js app uses [Express Framework](https://expressjs.com) and [Cloudant noSQL DB service](https://console.bluemix.net/catalog/services/cloudant-nosql-db) or the [MongoDB Service](http://mongodb.github.io/node-mongodb-native/) to add information to a database and then return information from a database to the UI. To learn more about how the app connects to Cloudant, see the [Cloudant library for Node.js](https://www.npmjs.com/package/cloudant).

<p align="center">
  <img src="https://raw.githubusercontent.com/IBM-Cloud/get-started-java/master/docs/GettingStarted.gif" width="300" alt="Gif of the sample app contains a title that says, Welcome, a prompt asking the user to enter their name, and a list of the database contents which are the names Joe, Jane, and Bob. The user enters the name, Mary and the screen refreshes to display, Hello, Mary, I've added you to the database. The database contents listed are now Mary, Joe, Jane, and Bob.">
</p>

## Before you begin

You'll need a [IBM Cloud account](https://console.ng.bluemix.net/registration/), [Git](https://git-scm.com/downloads), [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads), and [Node](https://nodejs.org/en/) installed. If you use [IBM Cloud Private](https://www.ibm.com/cloud-computing/products/ibm-cloud-private/), you need access to the [IBM Cloud Private Cloud Foundry](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/cloud_foundry/overview.html) environment.

## Instructions

**IBM Cloud Cloud Foundry**: [Getting started tutorial for Node.js](https://cloud.ibm.com/docs/cloud-foundry?topic=cloud-foundry-getting-started-node).


