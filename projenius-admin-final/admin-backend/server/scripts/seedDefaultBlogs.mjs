import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.mjs";
import { defaultBlogs } from "../data/defaultBlogs.mjs";
import { Blog } from "../models/Blog.mjs";
import { slugify } from "../utils/slugify.mjs";

async function seedDefaultBlogs() {
  await connectDatabase();

  let inserted = 0;
  let skipped = 0;

  for (const blog of defaultBlogs) {
    const slug = slugify(blog.title);
    const exists = await Blog.exists({ slug });

    if (exists) {
      skipped += 1;
      continue;
    }

    await Blog.create({
      ...blog,
      slug,
      publishedAt: new Date(),
    });
    inserted += 1;
  }

  console.log(`Default blog seed complete. Inserted: ${inserted}. Skipped: ${skipped}.`);
}

seedDefaultBlogs()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
