export default defineEventHandler(async (event) => {
  //セッション生成
  // await event.context.session.regeneratePromisified();

  console.log(event.context.session.id)
  console.log(event.context.session)

  // Assign some value to session:
  event.context.session.someKey = 'some value'

  await event.context.session.savePromisified();

  //セッション更新 アップデート
  // await event.context.session.reloadPromisified();
  //セッション保存
  // await event.context.session.savePromisified();
  // // Assign some value to session:
  // event.context.session.someKey = 'some value'
  //セッション破棄
  // await event.context.session.destroyPromisified();
  console.log('event.context.session.id', event.context.session.id);
  return event.context.session.id;
});
