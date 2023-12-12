export default defineEventHandler(async (event) => {
  // Get the session ID:
  console.log(event.context.session.id)
  console.log(event.context.session)

  // Assign some value to session:
  event.context.session.someKey = 'some value'
  await event.context.session.savePromisified();
  return sendRedirect(event, "/", 200);
});
