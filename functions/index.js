const fetch = require("node-fetch");
const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFunctions } = require("firebase-admin/functions");

initializeApp();

exports.auctionQueue = functions.tasks
  .taskQueue({
    retryConfig: {
      maxAttempts: 5,
      minBackoffSeconds: 60,
    },
    rateLimits: {
      maxConcurrentDispatches: 6,
    },
  })
  .onDispatch(async (data) => {
    try {
      await fetch("https://vercel-sdqumar.vercel.app/api", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log("error", error);
    }
  });

exports.enqueueTasks = functions.https.onRequest(async (request, response) => {
  console.log(request.body);
  const data = request.body;
  const queue = getFunctions().taskQueue("auctionQueue");
  const scheduleDelaySeconds = 60;
  queue.enqueue(data, {
    scheduleDelaySeconds,
    dispatchDeadlineSeconds: 60 * 5, // 5 minutes
  });
  response.sendStatus(200);
});
