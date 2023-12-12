export default defineEventHandler(async (event) => {
  //セッション破棄
  await event.context.session.destroyPromisified();
  return event.context.session.id;
});
