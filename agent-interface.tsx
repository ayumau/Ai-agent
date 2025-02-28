

import { useState } from "react"
import { Bot, Code, FileText, Info, Layers, MessageSquare, Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AgentInterface() {
  const [activeTab, setActiveTab] = useState("chat")
  const [autonomyLevel, setAutonomyLevel] = useState(50)
  const [planVisible, setPlanVisible] = useState(true)

  const sidebarItems = [
    { id: "chat", icon: MessageSquare },
    { id: "plan", icon: Layers },
    { id: "code", icon: Code },
    { id: "docs", icon: FileText }
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-16 border-r flex flex-col items-center py-4 gap-6">
        <Bot className="h-8 w-8 text-primary" />
        <div className="flex flex-col gap-4 flex-1">
          {sidebarItems.map(item => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={activeTab === item.id ? "bg-muted" : ""}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">v0 Agent</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="autonomy" className="text-sm">Autonomy Level</Label>
                <Progress value={autonomyLevel} className="h-2 w-32" />
              </div>
              <Button variant="outline" size="sm">
                <Info className="h-4 w-4 mr-2" />
                Project Context
              </Button>
            </div>
          </div>
        </header>

        {/* Chat/Interaction Area */}
        <section className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <UserMessage message="Create a responsive navbar component with a logo, navigation links, and a mobile menu." />
            <AgentMessage phase="Planning" progress={0} steps={["Create component", "Implement logo", "Add links", "Create menu", "Add animations"]} />
            <AgentMessage phase="Execution" progress={65} currentStep="Adding navigation links" />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Textarea placeholder="Ask me to build something..." className="min-h-[60px]" />
              <Button className="self-end">Send</Button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Switch id="show-plan" checked={planVisible} onCheckedChange={setPlanVisible} />
                <Label htmlFor="show-plan">Show planning phase</Label>
              </div>
              <span>Context: Next.js App Router Project</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function UserMessage({ message }) {
  return (
    <div className="flex justify-end">
      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
        <p>{message}</p>
      </div>
    </div>
  )
}

function AgentMessage({ phase, progress, steps = [], currentStep }) {
  const isPlanning = phase === "Planning"
  return (
    <div className="flex">
      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
        <div className="flex items-center gap-2 mb-2">
          {isPlanning ? <Bot className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
          <span className="font-medium">{phase} Phase</span>
          <Badge variant="outline" className="ml-auto">{isPlanning ? "Transparency" : "In Progress"}</Badge>
        </div>
        {isPlanning ? (
          <>
            <p className="text-sm mb-2">I'll create a responsive navbar component. Here's my plan:</p>
            <ol className="list-decimal list-inside text-sm space-y-1 ml-2">
              {steps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
          </>
        ) : (
          <>
            <p className="text-sm mb-2">Creating navbar component...</p>
            <Progress value={progress} className="h-2 mb-2" />
            <span className="text-xs text-muted-foreground">{currentStep}</span>
          </>
        )}
      </div>
    </div>
  )
}
