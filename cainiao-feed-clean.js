/* 菜鸟原生广告响应净化：按真实 HAR 结构清空广告位。 */
try {
  const obj = JSON.parse($response.body || "{}");
  const url = $request.url;
  const data = obj.data;

  if (url.includes("guoguo.nbnetflow.ads.batch.show.v2.cn") ||
      url.includes("guoguo.nbnetflow.ads.mshow.cn")) {
    // batch.show / mshow 的 data 是 {广告位ID: 广告数组}。
    if (data && typeof data === "object" && !Array.isArray(data)) {
      Object.keys(data).forEach(k => { data[k] = []; });
    }
  } else if (url.includes("guoguo.nbnetflow.ads.index.cn") ||
             url.includes("guoguo.nbnetflow.ads.show.cn") ||
             url.includes("nbcps.presentation.fetch.cn") ||
             /app\.home\.v\d+\.bottom\.area/.test(url)) {
    // index/show 等接口的广告列表位于 data.result。
    if (!obj.data || typeof obj.data !== "object") obj.data = {};
    obj.data.result = [];
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log(`[菜鸟去广告] 响应处理失败: ${e}`);
  $done({ body: $response.body });
}
