// Production of Samuel.M.K also know as T756-Tech
import { useState, useEffect } from 'react';
import { TelemetryData } from './useTelemetry';

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export function useMistral() {
    const [messages, setMessages] = useState<ChatMessage[]>([{
        role: 'assistant',
        content: 'Hello. I am the NetTwin AI. I am monitoring the network telemetry. How can I assist you?'
    }]);

    const [isChatLoading, setIsChatLoading] = useState(false);
    const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
    const [isActionExecuting, setIsActionExecuting] = useState(false);
    const [activeRecommendation, setActiveRecommendation] = useState<{ tower_id: string, recommendation: string } | null>(null);
    const [decisionLog, setDecisionLog] = useState<any[]>([]);

    useEffect(() => {
        fetchDecisionLog();
    }, []);

    const fetchDecisionLog = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/actions/log');
            const data = await res.json();
            setDecisionLog(data);
        } catch (err) {
            console.error("Decision Log Error:", err);
        }
    };

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const newMessages = [...messages, { role: 'user', content } as ChatMessage];
        setMessages(newMessages);
        setIsChatLoading(true);

        try {
            const res = await fetch('http://localhost:8000/api/v1/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: messages,
                    new_message: content
                })
            });

            const data = await res.json();
            setMessages([...newMessages, { role: 'assistant', content: data.content }]);
        } catch (err) {
            console.error("Chat Error:", err);
            setMessages([...newMessages, { role: 'assistant', content: "Error connecting to Mistral reasoning engine." }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const analyzeTower = async (telemetry: TelemetryData) => {
        setIsAnalysisLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/v1/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(telemetry)
            });

            const data = await res.json();
            setActiveRecommendation({
                tower_id: telemetry.tower_id,
                recommendation: data.mistral_recommendation
            });
        } catch (err) {
            console.error("Analysis Error:", err);
        } finally {
            setIsAnalysisLoading(false);
        }
    };

    const dismissRecommendation = () => {
        setActiveRecommendation(null);
    };

    const executeAction = async () => {
        if (!activeRecommendation) return;
        setIsActionExecuting(true);

        try {
            await fetch('http://localhost:8000/api/v1/actions/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activeRecommendation)
            });
            await fetchDecisionLog();
            dismissRecommendation();
        } catch (err) {
            console.error("Execute Action Error:", err);
        } finally {
            setIsActionExecuting(false);
        }
    };

    return {
        messages,
        sendMessage,
        isChatLoading,
        analyzeTower,
        isAnalysisLoading,
        activeRecommendation,
        dismissRecommendation,
        executeAction,
        isActionExecuting,
        decisionLog
    };
}
