"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { BouwDeZinTrial } from "@/types";
import { BOUW_DE_ZIN, shuffleTokens } from "@/lib/assessment/content";
import { Button } from "@/components/ui/button";

type TokenItem = { id: string; text: string };

type Props = {
  onComplete: (trial: BouwDeZinTrial) => void;
};

function SortableRow({
  item,
  disabled,
}: {
  item: TokenItem;
  disabled?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <button
        type="button"
        className={`flex min-h-11 w-full touch-none items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 text-left text-base shadow-sm outline-none transition hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 active:cursor-grabbing ${
          isDragging ? "z-10 scale-[1.02] opacity-90 shadow-md" : ""
        }`}
        {...attributes}
        {...listeners}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
          aria-hidden
        >
          ::
        </span>
        <span className="font-medium">{item.text}</span>
      </button>
    </div>
  );
}

export function BouwDeZin({ onComplete }: Props) {
  const startRef = useRef(
    typeof performance !== "undefined" ? performance.now() : 0
  );

  const initialItems = useMemo<TokenItem[]>(() => {
    const shuffled = shuffleTokens(BOUW_DE_ZIN.correctTokens);
    return shuffled.map((text, i) => ({
      id: `t-${i}-${text}`,
      text,
    }));
  }, []);

  const [items, setItems] = useState<TokenItem[]>(initialItems);
  const [locked, setLocked] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setItems((prev) => {
      const oldIndex = prev.findIndex((x) => x.id === active.id);
      const newIndex = prev.findIndex((x) => x.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  const confirm = useCallback(() => {
    if (locked) return;
    setLocked(true);
    const wordOrder = items.map((i) => i.text);
    const correctOrder =
      wordOrder.length === BOUW_DE_ZIN.correctTokens.length &&
      wordOrder.every((t, i) => t === BOUW_DE_ZIN.correctTokens[i]);
    const responseTimeMs = Math.round(performance.now() - startRef.current);
    onComplete({
      exerciseSlug: "bouw-de-zin",
      responseTimeMs,
      completedAt: new Date().toISOString(),
      wordOrder,
      correctOrder,
    });
  }, [items, onComplete, locked]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 pb-12 pt-8 sm:px-8">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Bouw de zin
        </p>
        <p className="text-sm text-muted-foreground">
          Sleep de woorden in de juiste volgorde — één zin die klopt.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-2" role="list">
            {items.map((item) => (
              <li key={item.id}>
                <SortableRow item={item} disabled={locked} />
              </li>
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <Button
        type="button"
        size="lg"
        className="min-h-11 w-full"
        disabled={locked}
        onClick={confirm}
      >
        Zo is mijn zin
      </Button>
    </div>
  );
}
