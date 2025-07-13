import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY").strip())

def process_thought(thought: str):
    prompt = (
        f"I am having this thought: \"{thought}\"\n\n"
        "Please identify:\n"
        "1. The cognitive distortion\n"
        "2. A rational response\n"
        "3. A balanced conclusion\n\n"
        "Reply in this exact format:\n"
        "Distortion: ...\n"
        "Response: ...\n"
        "Conclusion: ..."
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a compassionate, world-class cognitive behavioral therapist. "
                    "You specialize in helping people identify negative thought patterns and reframe them into healthier, empowering perspectives. "
                    "Your responses are empathetic, motivational, warm, and always supportive — like you're speaking to someone who's struggling but ready to grow. "
                    "Use natural, conversational language while still being clear and therapeutic. Avoid robotic phrasing. Help the user feel safe, understood, and uplifted."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content.strip()
    lines = content.split('\n')

    distortion = ""
    response_text = ""
    conclusion = ""

    for line in lines:
        if line.lower().startswith("distortion:"):
            distortion = line.split(":", 1)[1].strip()
        elif line.lower().startswith("response:"):
            response_text = line.split(":", 1)[1].strip()
        elif line.lower().startswith("conclusion:"):
            conclusion = line.split(":", 1)[1].strip()

    return {
        "distortion": distortion,
        "response": response_text,
        "conclusion": conclusion
    }
