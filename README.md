# Update runtime
public/runtimeConfig.json

# Upadate constant
rag-custom-ui/src/utils/constants.ts

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## to Create like and dislike button

1. modify  the src/component/ChatMessage.tsx, add and modify the URL

<!-- const addUserFeedback = async (feedbackData: FeedbackData) => {
      //console.log(feedbackData);

      await axios({
        method: "post",
        url: "https://ge857czzt6.execute-api.ap-south-1.amazonaws.com/test-rag/feedback",
        data: JSON.stringify(feedbackData),
      })
        // .then((response) => {
        //   console.log(response);
        // })
        .then((data) => {
          //console.log(data);
          console.log("Feedback Submitted!");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }; -->


2. update the public/runtimeConfig.json

3. Create a Rest API for like and dislike 

4. create a lambda function using ~/lamdba.py

5. Create a table in DynamoDB 

6. update ~/src/utils/constants.ts 



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

