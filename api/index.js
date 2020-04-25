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
