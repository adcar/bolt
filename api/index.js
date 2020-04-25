import base64url from "base64url";

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

async function getMessagesRaw(q = "", maxResults = 10) {
  return await window.gapi.client.gmail.users.messages.list({
    userId: "me",
    q,
    maxResults
  });
}

async function getMessage(messageId) {
  return await window.gapi.client.gmail.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full"
  });
}

export async function getMessages() {
  const res = await getMessagesRaw();
  for (const { id } of res.result.messages) {
    const msg = await getMessage(id);
    console.log(msg.result.payload);
    let data;
    if (
      msg.result.payload.parts !== undefined &&
      msg.result.payload.parts.length > 0
    ) {
      data = msg.result.payload.parts[0].body.data;
    } else if (msg.result.payload.body.size > 0) {
      data = msg.result.payload.body.data;
    }

    console.log(decode(data));
    // console.log(atob(decode(msg.result.payload.parts[0].body.data)));
  }
}

function decode(input) {
  if (input == undefined) {
    return null;
  }
  // Replace non-url compatible chars with base64 standard chars
  input = input.replace(/-/g, "+").replace(/_/g, "/");

  // Pad out with standard base64 required padding characters
  var pad = input.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error(
        "InvalidLengthError: Input base64url string is the wrong length to determine padding"
      );
    }
    input += new Array(5 - pad).join("=");
  }

  return atob(input);
}
