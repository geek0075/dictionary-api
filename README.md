# dictionary-api

INTRODUCTION

This code fulfills skills-assessment requirements for applying for a software developer position at catapult-health. The code is a nodejs application that demonstrates testing of a publicly hosted API as specified by catapult-health assessment requirements. 

This code is available online at the following github repository
https://github.com/geek0075/dictionary-api

It requires a installation of nodejs in order to run at all. That is it is a nodejs JavaScript application.

DOWNLOAD OR CLONE

Either go to the following URL (https://github.com/geek0075/dictionary-api) and click to download or run the following command line from your command line:

git clone https://github.com/geek0075/dictionary-api.git

INSTALL AND RUN

Navigate to the dictionary-api root folder on your command line console by running

$ cd /dictionary-api

Run the following command to install application dependencies

$ npm install

Once dependencies are installed successfully, please run

$ npm run test

This runs all tests and outputs the results.

TEST FRAMEWORK AND TECHNOLOGIES USED

This code is written using the jest testing framework (https://jestjs.io) and uses the superagent http request library (https://github.com/visionmedia/superagent) to make the API calls.

OBSERVATIONS FROM TESTING

I have chosen to test the 3 provided end-points for the following:

1. Status: the correct response code was returned
2. Syntax: the content-type of the returned content was as expected
3. Syntax: the server accepts correct input
4. Schema: the response payload conforms to an expected structure or format
5. Error handling: the server rejects incorrect input
6. Error handling: excluding a required parameter results in an error
7. Error handling: submitting incorrect data types results in an error
8. Functional: the server returns a predictable value based on the input condition
9. Functional: the request predictably modifies a resource

Everything works as documented on the API website at https://dictionaryapi.docs.apiary.io. I did notice however that when the API to edit the dictionary with a new key-value pair is called without a body or with a body that is not JSON, the API returns status code 200 and only indicates that something went wrong in the text property of the response. Most developers will likely only check that they received a response status of 200 to assume success. So additional attention would be required to notice this.
