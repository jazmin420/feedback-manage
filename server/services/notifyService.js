import twilio from "twilio";

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (ownerNumber, message) => {
  try {
    const response = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${ownerNumber}`,
      body: message,
    });
    console.log("Message sent:", response.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
};
