const axios = require("axios");
const tokens = require("./helper/token");

const botToken = tokens.botToken;
const chatID = tokens.chatID;
const sosad_cookie = tokens.sosad_cookie;

const header = {
  headers: {
    Referer: "https://sosad.fun",
    Host: "sosad.fun",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
    cookie: `'${sosad_cookie}'`,
  },
};

function teleMsg(msg) {
  const telegram =
    "https://api.telegram.org/bot" +
    botToken +
    "/sendMessage?chat_id=" +
    chatID +
    "&text=";

  return new Promise(async (resolve) => {
    try {
      let url = `${telegram}${encodeURI(msg)}`;
      let res = await axios.get(url);
      if (res.data.ok) {
        console.log("Tg：发送成功");
      } else {
        console.log("Tg：发送失败!");
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    resolve();
  });
}

return new Promise(async (resolve) => {
  try {
    let url = `https://sosad.fun/qiandao`;
    let res = await axios.get(url, header);
    if (res.status == 200) {
      console.log(`The requested url: ${res.config.url}`);
      console.log(`The responded url: ${res.request.res.responseUrl}`);

      teleMsg(`The requested url: ${res.config.url}.\nThe responded url: ${res.request.res.responseUrl}`);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
  resolve();
});