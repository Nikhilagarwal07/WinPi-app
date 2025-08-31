// 🔹 Initialize Pi SDK
export const initPi = () => {
  if (!window.Pi) {
    console.error("❌ Pi SDK not loaded. Please open in Pi Browser.");
    return;
  }
  window.Pi.init({ version: "2.0", sandbox: true });
  console.log("✅ Pi SDK initialized (sandbox mode)");
};

// 🔹 Handle Pi Login
export const loginWithPi = async () => {
  if (!window.Pi) {
    throw new Error("❌ Pi SDK not available. Please open in Pi Browser.");
  }

  const scopes = ["username", "payments"]; // same as Pi Demo
  try {
    // We need the entire authResult, including the accessToken, for server-side verification
    const authResult = await window.Pi.authenticate(
      scopes,
      (payment) => {
        console.log("⚡ Payment callback:", payment);
      }
    );
    console.log("✅ Frontend auth successful:", authResult);
    return authResult; // Return the full object now
  } catch (err) {
    console.error("❌ Frontend login failed:", err);
    throw err;
  }
};
