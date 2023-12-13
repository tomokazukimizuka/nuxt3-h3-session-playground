export default defineEventHandler(async (event) => {
  await event.context.session.savePromisified();
});
