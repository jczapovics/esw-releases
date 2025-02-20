
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare, User } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: string;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    // For now, just echo back the message
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: "I'm still learning about your release data. Soon I'll be able to help you analyze it!" 
    }]);
  };

  return (
    <Card className="mt-8 p-4 shadow-lg bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-brand-600" />
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>
      
      <ScrollArea className="h-[300px] pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "assistant" ? "text-gray-700" : "text-gray-800"
              }`}
            >
              {message.role === "assistant" ? (
                <MessageSquare className="w-6 h-6 mt-1 text-brand-600" />
              ) : (
                <User className="w-6 h-6 mt-1 text-gray-600" />
              )}
              <div className="flex-1 space-y-2">
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

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
