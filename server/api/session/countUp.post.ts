export default defineEventHandler(async (event) => {
  event.context.session.count = (event.context.session.count ?? 0) + 1;
});
