import { Task } from "./task.model";
export const TaskService = {
  create: (task) => Task.create(task),
  single: (field, value) => Task.findOne({ [field]: value }),
  update: (condition, task) => Task.updateOne({ condition }, task),
  list: (condition) => Task.find(condition?.length > 0 ? condition : {}),
  delete: (field, value) => Task.deleteOne({ [field]: value }),
};
