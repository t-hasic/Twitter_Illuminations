const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: "******************************",
  appSecret: "******************************",
  accessToken: "******************************",
  accessSecret: "******************************",
});
let tweet_data = null;
// With default prefix
async function test() {
  const result = await client.v2.get("tweets/search/recent", {
    query: "I am",
    max_results: 10,
  });
  tweet_data = result.data[0].text; // TweetV2[]
}

const http = require("http");

const server = http.createServer(function (req, res) {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200);
  test();
  let dataObj = tweet_data;
  let data = JSON.stringify(dataObj);
  res.end(data);
});

server.listen(3000, function () {
  console.log("Listening on port 1234");
});
