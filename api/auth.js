export const signIn = () => {
  return window.gapi.auth2.getAuthInstance().signIn();
};

export const initGmailClient = () => {
  const API_KEY = "AIzaSyDLGu1Bfrx7uf8GuTZFN4aua8wHTm0-ba4";
  const CLIENT_ID =
    "777825334282-vvt43n3rq71hhac9l9k1d9v5covp3dlr.apps.googleusercontent.com";

  // Array of API discovery doc URLs for APIs
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  // More info: https://developers.google.com/identity/protocols/googlescopes
  const SCOPES = "https://mail.google.com/"; // Scope for Read, send, delete, and manage your email

  const gapi = window.gapi;

  return gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  });
};

export const checkSignInStatus = () => {
  return new Promise((resolve, reject) => {
    initGmailClient()
      .then(() => {
        const gapi = window.gapi;

        const googleAuthInstance = gapi.auth2.getAuthInstance();

        const isSignedIn = googleAuthInstance.isSignedIn.get();

        console.log(googleAuthInstance.currentUser);

        if (isSignedIn) {
          // Listen for sign-in state changes.
          googleAuthInstance.isSignedIn.listen(isSignedIn => {
            updateSigninStatus(isSignedIn);
          });

          resolve(googleAuthInstance.currentUser.je);
        } else {
          reject();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Listener for sign-in state
export const updateSigninStatus = isSignedIn => {
  if (!isSignedIn) {
    // TODO: react to logged out status
  }
};

export const signOut = () => {
  return window.gapi.auth2.getAuthInstance().signOut();
};

export const listLabels = () => {

    window.gapi.client.gmail.users.labels
      .list({
        userId: "me"
      })
      .then(function(response) {
        var labels = response.result.labels;
        console.log("Labels:");

        if (labels && labels.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            var label = labels[i];
            console.log(label.name);
          }
        } else {
          console.log("No Labels found.");
        }
      });

};
