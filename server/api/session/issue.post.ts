export default defineEventHandler((event) => {
  // Get the session ID:
  console.log(event.context.session.id);

  // Assign value to session:
  if (event.context.session.hasOwnProperty("num")) {
    event.context.session.num = Number(event.context.session.num) + 1;
  } else {
    event.context.session.num = 1;
  }
  console.log("num", event.context.session.num);
  return {
    num: event.context.session.num,
  };
});
