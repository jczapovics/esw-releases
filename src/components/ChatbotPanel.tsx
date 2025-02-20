
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
    <Card className="mt-8 p-4 shadow-lg bg-white/50 backdrop-blur-sm border-brand-100">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b">
        <div className="bg-brand-100 p-2 rounded-lg">
          <MessageSquare className="h-5 w-5 text-brand-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
      </div>
      
      <ScrollArea className="h-[300px] pr-4 mb-6">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              } gap-3 animate-fadeIn`}
            >
              {message.role === "assistant" && (
                <div className="bg-brand-50 p-1.5 rounded-lg h-fit">
                  <MessageSquare className="w-5 h-5 text-brand-600 shrink-0" />
                </div>
              )}
              <div className={`flex-1 max-w-[80%] ${
                message.role === "user" ? "ml-auto" : ""
              }`}>
                <div className={`rounded-xl p-3.5 shadow-sm ${
                  message.role === "assistant" 
                    ? "bg-white text-gray-700 border border-brand-100" 
                    : "bg-gradient-to-br from-brand-600 to-brand-700 text-white"
                }`}>
                  {message.content}
                </div>
              </div>
              {message.role === "user" && (
                <div className="bg-gray-100 p-1.5 rounded-lg h-fit">
                  <User className="w-5 h-5 text-gray-600 shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="pt-3 border-t">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your releases..."
            className="flex-1 bg-white/80 border-brand-100 focus-visible:ring-brand-200"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-brand-600 hover:bg-brand-700 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
