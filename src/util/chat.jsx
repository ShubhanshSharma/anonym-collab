export default async function getMyChat() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // backend will read req.headers.authorization
      },
    });

    if (!res.ok) {
      // 401 / 403 / 500 etc
      const errText = await res.text();
      throw new Error(`Request failed (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return data; // shape depends on your API (array of rooms, etc.)
  } catch (err) {
    console.error("Error fetching chat rooms:", err);
    throw err;
  }
}
