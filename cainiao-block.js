/* 为菜鸟广告接口返回空的成功响应，避免页面继续渲染广告卡片。 */
$done({
  response: {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ data: {}, ret: ["SUCCESS::调用成功"], v: "1.0" })
  }
});
