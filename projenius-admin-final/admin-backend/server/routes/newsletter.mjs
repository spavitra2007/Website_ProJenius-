import { Router } from "express";
import { Subscriber } from "../models/Subscriber.mjs";
import { createSubscriptionEmail, sendEmail } from "../utils/email.mjs";

export const newsletterRouter = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

newsletterRouter.post("/subscribe", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      res.status(400).json({ error: "A valid email is required." });
      return;
    }

    const existingSubscriber = await Subscriber.findOne({ email }).lean();

    if (existingSubscriber?.subscribed) {
      res.json({
        alreadySubscribed: true,
        message:
          "You have already subscribed. Hope you are enjoying the ProJenius newsletter.",
        subscriber: {
          email: existingSubscriber.email,
          subscribed: existingSubscriber.subscribed,
        },
      });
      return;
    }

    const subscriber = await Subscriber.findOneAndUpdate(
      { email },
      { $set: { subscribed: true } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    let emailResult = { sent: false };

    try {
      emailResult = await sendEmail({
        to: subscriber.email,
        subject: "You are subscribed to the ProJenius newsletter",
        html: createSubscriptionEmail(),
      });
    } catch (error) {
      console.error("Subscription confirmation email failed.");
      console.error(error);
    }

    res.status(201).json({
      alreadySubscribed: false,
      emailSent: !emailResult.skipped && !emailResult.failed,
      message: "Subscribed successfully.",
      subscriber: {
        email: subscriber.email,
        subscribed: subscriber.subscribed,
      },
    });
  } catch (error) {
    next(error);
  }
});

newsletterRouter.post("/unsubscribe", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      res.status(400).json({ error: "A valid email is required." });
      return;
    }

    await Subscriber.findOneAndUpdate({ email }, { $set: { subscribed: false } });

    res.json({ message: "Unsubscribed successfully." });
  } catch (error) {
    next(error);
  }
});
