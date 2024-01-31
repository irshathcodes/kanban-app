import { RouterOutput } from "@/server/api/root";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

interface CardItemProps {
  data: RouterOutput["task"]["getColumnsWithTasks"][number];
}

export function CardItem(props: CardItemProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <li className="w-80 rounded-lg border bg-card p-3 text-card-foreground">
      <CardHeader column_name={props.data.column_name!} />
      <div className="my-4">
        <ul className="min-h-[200px] space-y-4">
          {props.data.tasks
            .filter((task) => task.name)
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
          <div className="mt-4">
            <AddCardForm
              column_id={props.data.column_id}
              onSuccess={() => setShowAddForm(false)}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}
      </div>
      {!showAddForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          type="button"
          className="w-full gap-1"
          variant="ghost"
        >
          <Plus size={16} /> Add a card
        </Button>
      )}
    </li>
  );
}

function CardHeader(props: { column_name: string }) {
  return (
    <div>
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
    <form className="animate-in fade-in zoom-in" onSubmit={handleSubmit}>
      <Textarea
        ref={inputRef}
        required
        name="card-name"
        className="resize-none"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            props.onCancel();
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
