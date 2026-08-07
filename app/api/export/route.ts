import { prisma } from "@/lib/prisma";

export async function GET() {
  const feedbacks = await prisma.feedback.findMany();

  const csv = [
    ["Title", "Description", "Status"],
    ...feedbacks.map((f) => [
      f.title,
      f.description,
      f.status,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="feedbacks.csv"',
    },
  });
}