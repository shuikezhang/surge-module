/* 阻断菜鸟 AMDC IP 调度，使业务请求回退到可被 Surge MITM 的域名。 */
const ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
if (/Cainiao/i.test(ua)) {
  $done({ body: "cainiao-adblock" });
} else {
  $done({});
}
