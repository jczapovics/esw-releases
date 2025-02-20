
import { DashboardLayout } from "@/components/DashboardLayout";
import { AIChatbot } from "@/components/AIChatbot";

const AskAI = () => {
  return (
    <DashboardLayout>
      <div className="animate-fadeIn">
        <h1 className="text-2xl font-semibold mb-6">Ask AI Assistant</h1>
        <AIChatbot />
      </div>
    </DashboardLayout>
  );
};

export default AskAI;
