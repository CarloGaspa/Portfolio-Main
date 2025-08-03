export const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.VERIFIED_SENDER,
    subject,
    text,
    html,
  };

  try {
    console.log("Attempting to send email with details:", {
      to: msg.to,
      from: msg.from,
      subject: msg.subject.substring(0, 20) + "...",
    });

    const response = await sgMail.send(msg);
    console.log("SendGrid response:", response[0].headers);
    return { success: true };
  } catch (error) {
    console.error("Full SendGrid error:", {
      status: error.code,
      headers: error.response?.headers,
      body: error.response?.body,
      message: error.message,
    });
    throw error;
  }
};
