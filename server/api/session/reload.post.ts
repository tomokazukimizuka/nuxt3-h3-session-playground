export default defineEventHandler(async (event) => {
  event.context.session.message = "セッションを更新しました";
  //このタイミングでセットしたデータはsaveしないと残らない
  // await event.context.session.savePromisified();
  await event.context.session.reloadPromisified();
});
