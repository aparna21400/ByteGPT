import "dotenv/config";

const getOpenAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
        }),
    };

    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            options
        );

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Data:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            throw new Error(data.error?.message || "OpenAI API Error");
        }

        return data.choices[0].message.content;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default getOpenAPIResponse;