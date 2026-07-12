import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { TaskItem } from "@/components/dashboard/TaskItem";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCreateTask, useTodayTasks, useCompleteTask } from "@/hooks/useTasks";
import type { Task } from "@/types";

interface TaskFormValues {
  title: string;
  description?: string;
  priority: Task["priority"];
  estimatedMinutes?: number;
}

export function TodayTasksPage() {
  const { data, isLoading } = useTodayTasks();
  const completeTask = useCompleteTask();
  const createTask = useCreateTask();
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<TaskFormValues>({
    defaultValues: { priority: "medium" },
  });

  const tasks = data?.tasks ?? [];

  const onSubmit = (values: TaskFormValues) => {
    createTask.mutate({
      ...values,
      estimatedMinutes: values.estimatedMinutes ? Number(values.estimatedMinutes) : undefined,
      dueDate: new Date().toISOString(),
    });
    reset();
    setModalOpen(false);
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div>
      <PageHeader
        title="Today's tasks"
        description={`${completedCount} of ${tasks.length} tasks completed`}
        action={
          <Button size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Add task
          </Button>
        }
      />

      <Card>
        <div className="space-y-2">
          {isLoading && (
            <>
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </>
          )}
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isUpdating={completeTask.isPending}
              onComplete={(id) => completeTask.mutate({ taskId: id })}
            />
          ))}
          {!isLoading && tasks.length === 0 && (
            <p className="py-10 text-center text-sm text-ink-500">
              Nothing scheduled today. Add a task to get moving.
            </p>
          )}
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add a task">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Title"
            placeholder="e.g. Solve 3 graph problems"
            {...register("title", { required: true })}
          />
          <Textarea label="Description (optional)" {...register("description")} />
          <div>
            <label className="label-base">Priority</label>
            <select className="input-base" {...register("priority")}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Input label="Estimated minutes" type="number" {...register("estimatedMinutes")} />
          <Button type="submit" className="w-full" isLoading={createTask.isPending}>
            Add task
          </Button>
        </form>
      </Modal>
    </div>
  );
}
