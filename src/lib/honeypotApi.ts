
const API_ENDPOINT = "https://jogdukxsxjwjhozwfapy.functions.supabase.co/honeypot-api";
const API_KEY = "honeypot-secure-api-key-123456";

// Fetch honeypot data (metrics, etc)
export async function fetchHoneypotData() {
  const response = await fetch(API_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  if (!response.ok) throw new Error("API error");
  return await response.json();
}

// Submit model training results
export async function submitModelTraining(trainingData: any) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      type: "train_model",
      ...trainingData,
    }),
  });
  if (!response.ok) throw new Error("API error");
  return await response.json();
}
