// File: frontend/src/pi.js

// 🔹 Initialize Pi SDK
export const initPi = (onReady) => {
  if (!window.Pi) {
    console.error("❌ Pi SDK not loaded. Please open in Pi Browser.");
    return;
  }
  window.Pi.init({ version: "2.0", sandbox: true });
  console.log("✅ Pi SDK initialized (sandbox mode)");
  // Call the onReady callback to update the app state
  onReady(); 
};

// 🔹 Handle Pi Login
export const loginWithPi = async () => {
  if (!window.Pi) {
    throw new Error("❌ Pi SDK not available. Please open in Pi Browser.");
  }

  const scopes = ["username", "payments"];
  try {
    const authResult = await window.Pi.authenticate(
      scopes,
      (payment) => {
        console.log("⚡ Payment callback:", payment);
      }
    );
    console.log("✅ Frontend auth successful:", authResult);
    return authResult;
  } catch (err) {
    console.error("❌ Frontend login failed:", err);
    throw err;
  }
};