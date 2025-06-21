import { Router } from "express";
import { z } from "zod";
import { db } from "../index.js";
import { contacts, newsletterSubscriptions } from "../../shared/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  message: z.string().min(1, "Message is required"),
});

// Newsletter subscription schema
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Contact form submission
router.post("/contact", async (req, res) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    
    const [contact] = await db
      .insert(contacts)
      .values({
        ...validatedData,
        createdAt: new Date(),
      })
      .returning();

    res.json({ success: true, message: "Contact form submitted successfully", id: contact.id });
  } catch (error) {
    console.error("Contact form error:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get all contacts (admin endpoint)
router.get("/contacts", async (req, res) => {
  try {
    const allContacts = await db.select().from(contacts).orderBy(contacts.createdAt);
    res.json(allContacts);
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Newsletter subscription
router.post("/newsletter", async (req, res) => {
  try {
    const { email } = newsletterSchema.parse(req.body);
    
    // Check if email already exists
    const existing = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email))
      .limit(1);
    
    if (existing.length > 0) {
      return res.json({
        success: true,
        message: "You're already subscribed to our newsletter!",
      });
    }
    
    const [subscription] = await db
      .insert(newsletterSubscriptions)
      .values({
        email,
        subscribedAt: new Date(),
      })
      .returning();

    res.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      id: subscription.id,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
        errors: error.errors,
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get all newsletter subscriptions (admin endpoint)
router.get("/newsletter", async (req, res) => {
  try {
    const subscriptions = await db
      .select()
      .from(newsletterSubscriptions)
      .orderBy(newsletterSubscriptions.subscribedAt);
    
    res.json(subscriptions);
  } catch (error) {
    console.error("Get newsletter subscriptions error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;