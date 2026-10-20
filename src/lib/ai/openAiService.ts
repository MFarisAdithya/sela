export interface OpenAiResponse {
  success: boolean;
  reply?: string;
  error?: string;
}

export async function callOpenAiChat(
  systemPrompt: string,
  userMessage: string
): Promise<OpenAiResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey.includes("your_openai_api_key_here")) {
    return {
      success: false,
      error: "NO_API_KEY",
    };
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8500); // 8.5s timeout

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 450,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      return {
        success: false,
        error: `API_ERROR_${response.status}: ${errText.slice(0, 100)}`,
      };
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return {
        success: false,
        error: "EMPTY_REPLY",
      };
    }

    return {
      success: true,
      reply,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      return {
        success: false,
        error: "TIMEOUT",
      };
    }
    return {
      success: false,
      error: err.message || "UNKNOWN_ERROR",
    };
  }
}
