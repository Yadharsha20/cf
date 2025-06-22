import { Router } from "express";
import { z } from "zod";
import { createClient } from '@supabase/supabase-js';

const router = Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  project_type: z.string().min(1, "Project type is required"),
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
    
    const { data, error } = await supabase
      .from('contacts')
      .insert([validatedData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to submit contact form",
      });
    }

    res.json({ 
      success: true, 
      message: "Contact form submitted successfully", 
      id: data.id 
    });
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
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contacts",
      });
    }

    res.json(data);
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
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('id')
      .eq('email', email)
      .single();
    
    if (existing) {
      return res.json({
        success: true,
        message: "You're already subscribed to our newsletter!",
      });
    }
    
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to subscribe to newsletter",
      });
    }

    res.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      id: data.id,
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
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch newsletter subscriptions",
      });
    }
    
    res.json(data);
  } catch (error) {
    console.error("Get newsletter subscriptions error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;