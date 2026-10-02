import { Subscriber } from "../models/Subscriber.mjs";
import { createBlogEmail, sendEmail } from "../utils/email.mjs";
import { Blog } from "../models/Blog.mjs";

const BATCH_SIZE = Number(process.env.NEWSLETTER_BATCH_SIZE || 25);
const BATCH_DELAY_MS = Number(process.env.NEWSLETTER_BATCH_DELAY_MS || 1200);
const SCHEDULE_CHECK_MS = Number(process.env.BLOG_SCHEDULE_CHECK_MS || 60000);

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function queueBlogNewsletter(blog) {
  setTimeout(() => {
    sendBlogNewsletter(blog).catch((error) => {
      console.error("Newsletter job failed.");
      console.error(error);
    });
  }, 0);
}

export function startScheduledBlogPublisher() {
  publishDueScheduledBlogs().catch((error) => {
    console.error("Scheduled blog publish check failed.");
    console.error(error);
  });

  setInterval(() => {
    publishDueScheduledBlogs().catch((error) => {
      console.error("Scheduled blog publish check failed.");
      console.error(error);
    });
  }, SCHEDULE_CHECK_MS);
}

export async function publishDueScheduledBlogs() {
  const now = new Date();
  const dueBlogs = await Blog.find({
    status: "scheduled",
    publishedAt: { $lte: now },
  }).limit(20);

  for (const blog of dueBlogs) {
    blog.status = "published";
    blog.scheduledAt = null;
    blog.newsletterSentAt = blog.newsletterSentAt || now;
    await blog.save();

    queueBlogNewsletter(blog.toObject());
  }
}

export async function sendBlogNewsletter(blog) {
  const subscribers = await Subscriber.find({ subscribed: true })
    .select("email")
    .lean();

  if (!subscribers.length) {
    console.log("No newsletter subscribers found.");
    return;
  }

  const html = createBlogEmail(blog);
  const subject = `New blog: ${blog.title}`;

  for (let index = 0; index < subscribers.length; index += BATCH_SIZE) {
    const batch = subscribers.slice(index, index + BATCH_SIZE);

    await Promise.allSettled(
      batch.map((subscriber) =>
        sendEmail({
          to: subscriber.email,
          subject,
          html,
        }),
      ),
    );

    if (index + BATCH_SIZE < subscribers.length) {
      await wait(BATCH_DELAY_MS);
    }
  }
}
