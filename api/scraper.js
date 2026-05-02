// Save this as /api/scrape.js in your GitHub repo
export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY, // This pulls from Vercel Settings
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `Extract realtor name, phone, and email from this URL: ${url}. 
                     Only return JSON: [{"name": "...", "phone": "...", "email": "..."}].
                     Skip any results that do not have an email address.`
          },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}