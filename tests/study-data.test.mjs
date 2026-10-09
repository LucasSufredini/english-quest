import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDailyReviewQueue,
  cards,
  makePlan,
  pickResources,
  resources,
  stories,
} from "../lib/study-data.ts";

test("o catálogo mantém uma base ampla de estudo", () => {
  assert.equal(resources.length, 76);
  assert.equal(cards.length, 136);
  assert.equal(stories.length, 10);
});

test("o plano usa exatamente o tempo escolhido", () => {
  for (const minutes of [15, 30, 45, 60]) {
    const plan = makePlan("A2", minutes, ["games", "anime"], "2026-10-08", "student-a", "conversation", 5);
    assert.equal(plan.length, 4);
    assert.equal(plan.reduce((total, task) => total + task.minutes, 0), minutes);
  }
});

test("o mesmo perfil recebe um plano estável durante o dia", () => {
  const first = makePlan("B1", 30, ["music", "travel"], "2026-10-08", "student-a", "travel", 3);
  const second = makePlan("B1", 30, ["music", "travel"], "2026-10-08", "student-a", "travel", 3);
  assert.deepEqual(second, first);
});

test("as recomendações respeitam interesses e nível", () => {
  const selected = pickResources("B1", ["science"], "student-b:2026-10-08", 3);
  assert.equal(selected.length, 3);
  assert.ok(selected.every((resource) => resource.interests.includes("science")));
  assert.ok(selected.some((resource) => resource.levels.includes("B1")));
});

test("a revisão prioriza vencidos e limita cartões novos", () => {
  const sample = cards.slice(0, 20);
  const reviews = [
    { cardId: sample[0].id, dueDate: "2026-10-07" },
    { cardId: sample[1].id, dueDate: "2026-10-08" },
    { cardId: sample[2].id, dueDate: "2026-10-20" },
  ];
  const queue = buildDailyReviewQueue(sample, reviews, "2026-10-08", 5);

  assert.deepEqual(queue.slice(0, 2).map((card) => card.id), [sample[0].id, sample[1].id]);
  assert.equal(queue.length, 7);
  assert.ok(!queue.some((card) => card.id === sample[2].id));
});
