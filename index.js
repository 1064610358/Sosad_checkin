const got = require("got");

const tokens = require("./helper/token");
const botToken = tokens.botToken;
const chatID = tokens.chatID;
const sosad_cookie = tokens.sosad_cookie;

const sosad = got.extend({
  prefixUrl: "https://sosad.fun/",
  // responseType: 'json',
  headers: {
    Cookie: sosad_cookie,
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
  },
});

function teleMsg(msg) {
  const telegram =
    "https://api.telegram.org/bot" +
    botToken +
    "/sendMessage?chat_id=" +
    chatID +
    "parse_mode=HTML&text=";

  (async () => {
    try {
      await got(telegram + msg);
    } catch (error) {
      console.log(error.response.body);
    }
  })();
}

(async () => {
  try {
    console.log("Starting...");
    const response = await sosad("qiandao");

    let now = new Date().toLocaleString("zh-CN", {
      timeZone: "Australia/Sydney",
      timeZoneName: "long",
    });

    let message = `
✅ 签到于 ${now}
The status code: ${response.statusCode}.
The requested URL: ${response.requestUrl}.
The redirected URL: ${response.redirectUrls}.
`;

    console.log(message);
    teleMsg(encodeURI(message));
  } catch (error) {
    console.log("Here is the error:");
    console.log(error);
  }
})();