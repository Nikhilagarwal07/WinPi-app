// utils/pi.js

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
    const authResult = await window.Pi.authenticate(
      scopes,
      (payment) => {
        console.log("⚡ Payment callback:", payment);
      }
    );
    console.log("✅ Auth result:", authResult);
    return authResult.user;
  } catch (err) {
    console.error("❌ Login failed:", err);
    throw err;
  }
};
