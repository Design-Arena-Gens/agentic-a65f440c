'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Send, Mic, MicOff, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  sites: Array<{
    id: string
    name: string
    location: string
    status: string
    lastAudit: string
    incidents: number
  }>
}

export function ChatInterface({ sites }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your Farm Safety Assistant. I can help you with:

• **Report incidents** - Tell me what happened, I'll document it
• **Schedule audits** - I'll help plan and track safety inspections
• **Compliance planning** - Ask me about Iowa ag safety regulations
• **Analyze data** - Get insights from your safety records
• **Manage hazards** - Track and mitigate risks across your sites
• **Crew & equipment** - Keep records organized

Just tell me what you need, or ask me a question. I'm here to make farm safety simple.`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: String(Date.now()),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responseContent = generateResponse(input.trim(), sites)
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg">
        <div className="border-b bg-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">AI Safety Assistant</h2>
          <p className="text-sm text-stone-500">Ask me anything about safety, compliance, or your operations</p>
        </div>

        <ScrollArea className="h-[500px] p-6 bg-stone-50" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-stone-900 text-white'
                      : 'bg-white border shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-stone-400' : 'text-stone-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border shadow-sm rounded-lg px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-stone-400" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-white p-4 rounded-b-lg">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about incidents, audits, compliance, or anything safety-related..."
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <Button
                onClick={toggleVoice}
                variant={isListening ? 'default' : 'outline'}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Badge variant="outline" className="cursor-pointer hover:bg-stone-100">
          Report an incident
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-stone-100">
          Schedule audit
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-stone-100">
          Check compliance status
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-stone-100">
          What are Iowa ag safety requirements?
        </Badge>
      </div>
    </div>
  )
}

function generateResponse(input: string, sites: any[]): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes('incident') || lowerInput.includes('accident') || lowerInput.includes('injury')) {
    return `I'll help you report this incident. To create a complete record, I need a few details:

1. **Which site?** (${sites.map(s => s.name).join(', ')})
2. **What happened?** Brief description
3. **When?** Date and time
4. **Anyone injured?** If yes, what kind of injury?
5. **Equipment involved?** Any machinery or tools?

Just tell me in your own words, and I'll fill out the official incident report for you. You can review and approve it before we file it.`
  }

  if (lowerInput.includes('audit') || lowerInput.includes('inspection')) {
    return `I can help you schedule and conduct a safety audit.

**Upcoming audits needed:**
${sites.map(site => `• ${site.name} - Last audit: ${site.lastAudit}`).join('\n')}

Would you like me to:
- Start an audit checklist for a specific site?
- Schedule audits for multiple sites?
- Generate a compliance report from past audits?

Which site would you like to start with?`
  }

  if (lowerInput.includes('compliance') || lowerInput.includes('regulation') || lowerInput.includes('requirement')) {
    return `Iowa agricultural operations need to follow several key safety regulations:

**Key Iowa Ag Safety Requirements:**
• OSHA agricultural standards (grain handling, confined spaces)
• Pesticide applicator certification (Iowa Dept of Ag)
• Animal facility ventilation standards
• Equipment safety (PTO guards, ROPS on tractors)
• Employee training documentation

I can help you:
- Create compliance plans for each site
- Track certification renewals
- Generate required documentation
- Schedule training sessions

What specific compliance area do you need help with?`
  }

  if (lowerInput.includes('hazard') || lowerInput.includes('risk')) {
    return `I'll help you manage hazards across your operations. Common farm hazards in Iowa include:

• Chemical storage (pesticides, fertilizers)
• Confined space entry (silos, manure pits)
• Equipment operation (tractors, combines)
• Livestock handling
• Grain bin entry
• Weather-related (heat stress, cold exposure)

Would you like to:
- Document a new hazard?
- Review hazards at a specific site?
- Create a hazard mitigation plan?
- Get safety recommendations?

Tell me which site or hazard type you want to address.`
  }

  if (lowerInput.includes('crew') || lowerInput.includes('employee') || lowerInput.includes('worker')) {
    return `I can help manage your crew safety records and training.

**What I can do:**
• Track employee safety training and certifications
• Schedule and log safety meetings
• Manage PPE assignments
• Record work hours and site assignments
• Generate crew safety reports

What would you like to help with? For example:
- "Add a new crew member"
- "Who needs recertification?"
- "Schedule a safety meeting"
- "Show crew assignments for [site name]"`
  }

  if (lowerInput.includes('equipment') || lowerInput.includes('machinery') || lowerInput.includes('tractor')) {
    return `I'll help you track equipment safety and maintenance.

**Equipment Safety Management:**
• Maintenance schedules and logs
• Safety inspection records
• Pre-operation checklists
• Equipment-specific hazards
• ROPS and guard verification

Would you like to:
- Add new equipment to the system?
- Log a maintenance issue?
- Schedule equipment inspections?
- View equipment history for a site?

Just let me know what you need.`
  }

  if (lowerInput.includes('analyze') || lowerInput.includes('report') || lowerInput.includes('data') || lowerInput.includes('insight')) {
    return `I can analyze your safety data to find patterns and insights.

**Available Analytics:**
📊 Incident trends across sites
📅 Seasonal risk patterns
⚠️ Most common hazard types
✅ Compliance status by site
👥 Crew safety performance
🔧 Equipment incident rates

Based on your current data:
• ${sites.reduce((acc, s) => acc + s.incidents, 0)} total incidents recorded
• ${sites.length} active sites
• Next audit due: ${sites[0]?.name}

What would you like me to analyze? I can create custom reports for any timeframe or category.`
  }

  // Default response
  return `I'm here to help with your farm safety needs. I can assist with:

• **Incident reporting** - Quick documentation of accidents or near-misses
• **Safety audits** - Schedule and conduct inspections
• **Compliance** - Iowa ag regulations and requirements
• **Hazard management** - Identify and track risks
• **Crew safety** - Training, certifications, and records
• **Equipment** - Safety inspections and maintenance
• **Analytics** - Insights from your safety data

What would you like help with today?`
}
