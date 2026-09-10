import Brevo from "@getbrevo/brevo";

const SendEmail = async (to, otp) => {
  console.log("📨 Sending OTP via Brevo API to:", to);

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const emailData = {
      sender: { email: process.env.BREVO_EMAIL, name: "Buy Books" },
      to: [{ email: to }],
      subject: "Your Login OTP",
      textContent: `Your OTP is ${otp}`,
    };

    await apiInstance.sendTransacEmail(emailData);
    console.log("✅ OTP email sent successfully via Brevo API");
  } catch (error) {
    console.error("❌ Brevo API send error:", error.response?.body || error.message);
    throw new Error("Email send failed");
  }
};

export default SendEmail;
