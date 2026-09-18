/* 菜鸟 App 页面净化脚本
 * 针对“我的”推广区、首页运营卡片和广告数据。
 */
let obj;
try {
  obj = JSON.parse($response.body);
  const url = $request.url;

  // “我的”页面：移除钱包推广、热门活动、会员、资产和横幅区域。
  if (url.includes("mtop.cainiao.app.e2e.engine.page.fetch")) {
    const page = obj?.data?.data;
    if (page) {
      ["banner", "activity", "asset", "vip", "wallet"].forEach(k => delete page[k]);
    }
  }

  // 首页协议：移除大横幅、待办/运营活动区域。
  const cleanHome = data => {
    const list = data?.result?.dataList;
    if (Array.isArray(list)) {
      data.result.dataList = list.filter(x => ![
        "big_banner_area_v870",
        "todo_list_v860"
      ].includes(x?.type));
    }
  };
  if (url.includes("mtop.cainiao.nbpresentation.protocol.homepage.get.cn")) {
    cleanHome(obj?.data);
  } else if (url.includes("mtop.cainiao.nbpresentation.homepage.merge.get.cn")) {
    const data = obj?.data || {};
    Object.keys(data).forEach(k => {
      if (k.startsWith("mtop.cainiao.nbpresentation.protocol.homepage.get.cn@")) cleanHome(data[k]?.data);
    });
  }

  // 菜鸟广告聚合接口：清空常见广告位。
  if (url.includes("mtop.cainiao.guoguo.nbnetflow.ads.mshow")) {
    ["1308", "1275", "205"].forEach(k => delete obj?.data?.[k]);
  } else if (url.includes("mtop.cainiao.guoguo.nbnetflow.ads.index.cn")) {
    if (obj?.data?.result) obj.data.result = [{}];
  } else if (url.includes("mtop.cainiao.adkeyword")) {
    if (obj?.data?.result?.adHotKeywords) obj.data.result.adHotKeywords = [];
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body: $response.body });
}
