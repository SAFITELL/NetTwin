# Production of Samuel.M.K also know as T756-Tech
import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from dotenv import load_dotenv

load_dotenv()

MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")

if not MISTRAL_API_KEY:
    print("WARNING: MISTRAL_API_KEY environment variable is not set. AI reasoning will fail.")

client = MistralClient(api_key=MISTRAL_API_KEY)

def analyze_network_state(state_payload: dict) -> str:
    """
    Sends network state to Mistral for analysis and optimization recommendations.
    """
    system_prompt = """
    You are the core logic engine of NetTwin AI, an advanced telecom operations platform.
    Your job is to analyze network state telemetry (utilization, latency, packet loss) and 
    determine the best load balancing or optimization strategy to prevent congestion.
    
    You must output your findings in a structured, professional, Stripe-style format:
    1. A concise summary of the issue.
    2. The recommended technical action (e.g. routing protocol change, power state toggle).
    3. The expected outcome of taking this action.
    """
    
    user_prompt = f"Analyze the following telecom network telemetry data and provide recommendations:\n\n{state_payload}"
    
    messages = [
        ChatMessage(role="system", content=system_prompt),
        ChatMessage(role="user", content=user_prompt)
    ]
    
    response = client.chat(
        model="mistral-large-latest",
        messages=messages
    )
    
    return response.choices[0].message.content

def chat_with_noc(history: list[dict], new_message: str) -> str:
    """
    Handles conversation with the Network Operations Center engineer.
    """
    messages = [
        ChatMessage(role="system", content="You are the NetTwin AI assistant. Provide extremely technical, accurate answers about telecom infrastructure. Keep answers concise.")
    ]
    
    for msg in history:
        messages.append(ChatMessage(role=msg["role"], content=msg["content"]))
        
    messages.append(ChatMessage(role="user", content=new_message))
    
    response = client.chat(
        model="mistral-medium-latest",
        messages=messages
    )
    
    return response.choices[0].message.content
