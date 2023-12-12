export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  event.context.session[body.key] = body.value;
  console.log(event.context.session);
});
