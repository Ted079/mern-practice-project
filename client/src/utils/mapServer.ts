//функцию-мэппер
export const mapServerTodo = (t: ServerTodo): Todo => ({
  id: t._id,
  name: t.name,
  description: t.description,
  checked: t.checked,
});
