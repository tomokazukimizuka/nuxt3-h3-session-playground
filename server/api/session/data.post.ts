export default defineEventHandler(async (event) => {
  console.log(event.context.session);
  return event.context.session;
});
