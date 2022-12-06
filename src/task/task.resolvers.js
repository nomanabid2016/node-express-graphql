import { TaskService } from "./task.service";

const Task = {
  Query: {
    tasks: async () => await TaskService.list(),
    task: async (_, args) => await TaskService.single("_id", args.id),
  },
  Mutation: {
    addTask: async (_, args) => {
      return await TaskService.create(args);
    },
    updateTask: async (_, args) => {
      return await TaskService.update([{ _id: args._id }], args);
    },
    deleteTask: async (_, args) => {
      return await TaskService.delete("_id", args._id);
    },
  },
};

export default Task;
