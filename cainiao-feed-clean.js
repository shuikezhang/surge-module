/* 菜鸟信息流广告响应净化：保留正确响应结构，避免空白骨架占位。 */
try {
  const obj = JSON.parse($response.body || "{}");
  const url = $request.url;

  if (url.includes("guoguo.nbnetflow.ads.show.cn")) {
    // 明确告诉客户端列表已加载但没有广告，而不是中断请求。
    if (!obj.data || typeof obj.data !== "object") obj.data = {};
    obj.data.result = [];
  } else if (url.includes("guoguo.nbnetflow.ads.mshow.cn")) {
    // 常见首页及“我的”横幅广告位。
    ["205", "1275", "1308", "1316", "1332"].forEach(k => {
      if (obj.data && Object.prototype.hasOwnProperty.call(obj.data, k)) delete obj.data[k];
    });
  } else if (url.includes("nbcps.presentation.fetch.cn")) {
    if (!obj.data || typeof obj.data !== "object") obj.data = {};
    obj.data.result = [];
  } else if (/app\.home\.v\d+\.bottom\.area/.test(url)) {
    if (!obj.data || typeof obj.data !== "object") obj.data = {};
    obj.data.result = [];
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body: $response.body });
}
