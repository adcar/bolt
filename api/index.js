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

async function getMessageIds(pageToken, q = "", maxResults = 30) {
  return await window.gapi.client.gmail.users.messages.list({
    userId: "me",
    pageToken,
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

export async function getMessages(pageToken) {
  let promises = [];
  const res = await getMessageIds(pageToken);
  const nextPageToken = res.result.nextPageToken;
  for (const { id } of res.result.messages) {
    promises.push(getMessage(id));
  }
  let messages = [];
  await Promise.all(promises).then(msgs => {
    for (const msg of msgs) {
      let data;

      if (
        msg.result.payload.parts !== undefined &&
        msg.result.payload.parts.length > 0
      ) {
        // If HTML exists, use that
        if (msg.result.payload.parts.length > 1) {
          data = msg.result.payload.parts[1].body.data;
        }
        // Otherwise, use plaintext
        // else {
        //   data = msg.result.payload.parts[0].body.data;
        // }
      } else if (msg.result.payload.body.size > 0) {
        data = msg.result.payload.body.data;
      }
      messages.push({
        id: msg.result.id,
        body: decode(data),
        headers: msg.result.payload.headers,
        snippet: msg.result.snippet
      });
    }
  });
  return { nextPageToken, messages };
}

function decode(input) {
  if (input === undefined) {
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
