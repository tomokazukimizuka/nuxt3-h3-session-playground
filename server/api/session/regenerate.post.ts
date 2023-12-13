export default defineEventHandler(async (event) => {
  //セッション再生成
  await event.context.session.regeneratePromisified();
});
