/**
 * Sinh / cập nhật slug cho ProductV2 từ trường `name`.
 * Chạy từ thư mục fe: pnpm slug:v2
 *
 * Mặc định: chỉ bản ghi slug null hoặc rỗng.
 * Thêm --all: ghi đè slug cho mọi sản phẩm (vẫn đảm bảo unique).
 */
import "dotenv/config";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const forceAll = process.argv.includes("--all");

/** Bỏ dấu tiếng Việt, lowercase, [a-z0-9-] */
function slugifyName(name: string): string {
  const s = name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
  return s || "san-pham";
}

function uniqueSlug(base: string, productId: string, used: Set<string>): string {
  let candidate = base;
  if (!used.has(candidate)) {
    used.add(candidate);
    return candidate;
  }
  const tail = productId.slice(-8);
  candidate = `${base}-${tail}`;
  let n = 0;
  while (used.has(candidate)) {
    n += 1;
    candidate = `${base}-${tail}-${n}`;
  }
  used.add(candidate);
  return candidate;
}

async function main() {
  const products = await prisma.productV2.findMany({
    select: { productId: true, name: true, slug: true },
    ...(forceAll
      ? {}
      : {
          where: {
            OR: [{ slug: null }, { slug: "" }],
          },
        }),
  });

  if (products.length === 0) {
    console.log(forceAll ? "Không có ProductV2 nào." : "Không có bản ghi nào thiếu slug.");
    return;
  }

  const used = new Set<string>();
  if (!forceAll) {
    const existing = await prisma.productV2.findMany({
      where: {
        AND: [{ slug: { not: null } }, { slug: { not: "" } }],
      },
      select: { slug: true },
    });
    for (const r of existing) {
      if (r.slug) used.add(r.slug);
    }
  }

  const updates: { productId: string; slug: string }[] = [];
  for (const p of products) {
    const base = slugifyName(p.name);
    const slug = uniqueSlug(base, p.productId, used);
    updates.push({ productId: p.productId, slug });
  }

  console.log(`Cập nhật ${updates.length} ProductV2${forceAll ? " (--all)" : ""}…`);

  const batchSize = 25;
  for (let i = 0; i < updates.length; i += batchSize) {
    const slice = updates.slice(i, i + batchSize);
    await prisma.$transaction(
      slice.map((u) =>
        prisma.productV2.update({
          where: { productId: u.productId },
          data: { slug: u.slug },
        }),
      ),
    );
  }

  console.log("Xong.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
