export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) return;
  event.context.session[body.key] = body.value;
});
