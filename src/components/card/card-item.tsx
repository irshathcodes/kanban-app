import { RouterOutput } from "@/server/api/root";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

interface CardItemProps {
  column: RouterOutput["task"]["getColumnsAndTasks"]["columns"][number];
  tasks: RouterOutput["task"]["getColumnsAndTasks"]["tasks"];
}

export function CardItem(props: CardItemProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <li className="flex h-fit max-h-full w-80 shrink-0 flex-col rounded-lg border bg-card text-card-foreground">
      <CardHeader column_name={props.column.name} />
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-4">
          {props.tasks
            .filter((task) => task.column_id === props.column.column_id)
            .map((task) => (
              <li
                className="rounded-lg bg-background p-2.5 text-foreground"
                key={task.task_id}
              >
                <div>{task.name}</div>
              </li>
            ))}
        </ul>
        {showAddForm && (
          <div className="mt-2 p-2">
            <AddCardForm
              column_id={props.column.column_id}
              onSuccess={() => setShowAddForm(false)}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}
      </div>
      {!showAddForm && (
        <div className="shrink-0 p-2">
          <Button
            onClick={() => setShowAddForm(true)}
            type="button"
            className="w-full gap-1"
            variant="ghost"
          >
            <Plus size={16} /> Add a card
          </Button>
        </div>
      )}
    </li>
  );
}

function CardHeader(props: { column_name: string }) {
  return (
    <div className="shrink-0 p-3">
      <h1 className="font-semibold">{props.column_name}</h1>
    </div>
  );
}

function AddCardForm(props: {
  onSuccess: () => void;
  onCancel: () => void;
  column_id: number;
}) {
  const { mutate, isLoading } = api.task.createTask.useMutation();
  const utils = api.useUtils();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = inputRef.current!.value;
    mutate(
      { column_id: props.column_id, name },
      {
        onSuccess() {
          utils.task.invalidate();
          props.onSuccess();
        },
      },
    );
  };

  return (
    <form
      ref={formRef}
      className="animate-in fade-in zoom-in"
      onSubmit={handleSubmit}
    >
      <Textarea
        ref={inputRef}
        required
        name="card-name"
        className="min-h-[50px] resize-none"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            props.onCancel();
          }
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            const form = formRef.current!;
            if (typeof form.requestSubmit === "function") {
              form.requestSubmit();
            } else {
              form.dispatchEvent(new Event("submit", { cancelable: true }));
            }
          }
        }}
      ></Textarea>
      <div className="ml-auto mt-4 flex w-fit gap-1.5">
        <Button
          onClick={props.onCancel}
          type="button"
          variant="ghost"
          size="sm"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} size="sm" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}
