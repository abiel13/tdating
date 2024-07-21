"use server";
const axios = require("axios");

const token = process.env.Token;
console.log(token);
const url = `https://api.telegram.org/bot${token}/setWebhook`;

const webhookUrl = "https://tdating.vercel.app/api/telegram";

axios
  .post(url, {
    url: webhookUrl,
  })
  .then((response) => {
    console.log("Webhook set:", response.data);
  })
  .catch((error) => {
    console.error("Error setting webhook:", error);
  });
