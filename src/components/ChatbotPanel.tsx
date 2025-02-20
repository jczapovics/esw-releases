
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare, User } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: string;
  isStreaming?: boolean;
};

export function ChatbotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I can help you analyze your release data. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }
    };

    // Use a small timeout to ensure the content has been rendered
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  const simulateStreamingResponse = async (response: string) => {
    const fullResponse = response;
    let currentResponse = "";
    
    // Add empty streaming message
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: "",
      isStreaming: true
    }]);

    // Stream each character
    for (let i = 0; i < fullResponse.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Delay between each character
      currentResponse += fullResponse[i];
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: "assistant",
          content: currentResponse,
          isStreaming: i < fullResponse.length - 1
        };
        return newMessages;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    // Simulate streaming AI response
    await simulateStreamingResponse("I'm still learning about your release data. Soon I'll be able to help you analyze it!");
    
    setIsLoading(false);
  };

  return (
    <Card className="mt-8 p-4 shadow-lg bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-brand-600" />
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>
      
      <div ref={scrollAreaRef}>
        <ScrollArea className="h-[300px] pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                } items-start gap-3`}
              >
                {message.role === "assistant" && (
                  <MessageSquare className="w-6 h-6 mt-1 text-brand-600 shrink-0" />
                )}
                <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} max-w-[80%]`}>
                  <div className={`inline-block rounded-lg px-4 py-2 shadow-sm ${
                    message.role === "assistant" 
                      ? "bg-white text-gray-700" 
                      : "bg-brand-600 text-white"
                  }`}>
                    {message.content}
                    {message.isStreaming && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-brand-600 animate-pulse" />
                    )}
                  </div>
                </div>
                {message.role === "user" && (
                  <User className="w-6 h-6 mt-1 text-gray-600 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your releases..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-brand-600 hover:bg-brand-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
