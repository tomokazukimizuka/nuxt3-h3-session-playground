export default defineEventHandler(async (event) => {
  return {
    id: event.context.session.id,
    data: event.context.session
  };
});
