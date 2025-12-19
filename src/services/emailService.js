// src/services/emailService.js
import emailjs from "emailjs-com";

// Send verification email
export async function sendVerificationEmail(email, code) {
  return await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_VERIFICATION_TEMPLATE,
    {
      mail: email,
      name: "Verification",
      message: `Your verification code is: ${code}`,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}

// Send actual message
export async function sendFinalMessage(email) {
  return await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      mail: email,
      name: "Guest",
      message: `Hello! Dropping a message to connect and build something awesome.
        ${email}`,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}
