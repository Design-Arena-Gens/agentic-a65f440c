'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, MapPin, MessageSquare, Mic, AlertTriangle, Users, Wrench, ClipboardCheck, FileText, TrendingUp } from 'lucide-react'
import { ChatInterface } from '@/components/ChatInterface'
import { SiteCard } from '@/components/SiteCard'

const MOCK_SITES = [
  { id: '1', name: 'North Field Operations', location: 'Story County, IA', status: 'active', lastAudit: '2025-11-10', incidents: 0 },
  { id: '2', name: 'South Livestock Facility', location: 'Polk County, IA', status: 'active', lastAudit: '2025-11-05', incidents: 2 },
  { id: '3', name: 'Equipment Maintenance Shop', location: 'Dallas County, IA', status: 'active', lastAudit: '2025-11-01', incidents: 1 },
]

export default function Dashboard() {
  const [sites, setSites] = useState(MOCK_SITES)
  const [showNewSiteDialog, setShowNewSiteDialog] = useState(false)
  const [newSiteName, setNewSiteName] = useState('')
  const [newSiteLocation, setNewSiteLocation] = useState('')
  const [activeView, setActiveView] = useState<'overview' | 'chat'>('overview')

  const handleAddSite = () => {
    if (newSiteName && newSiteLocation) {
      setSites([...sites, {
        id: String(sites.length + 1),
        name: newSiteName,
        location: newSiteLocation,
        status: 'active',
        lastAudit: new Date().toISOString().split('T')[0],
        incidents: 0
      }])
      setNewSiteName('')
      setNewSiteLocation('')
      setShowNewSiteDialog(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-stone-900">Farm Safety Hub</h1>
              <p className="text-sm text-stone-500 mt-1">Iowa Agricultural EHS Management</p>
            </div>
            <Button
              onClick={() => setActiveView(activeView === 'overview' ? 'chat' : 'overview')}
              variant={activeView === 'chat' ? 'default' : 'outline'}
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              {activeView === 'chat' ? 'Back to Overview' : 'Talk to AI Assistant'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {activeView === 'chat' ? (
          <ChatInterface sites={sites} />
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Your Sites</h2>
                <p className="text-sm text-stone-500 mt-1">Manage safety across all your agricultural operations</p>
              </div>
              <Dialog open={showNewSiteDialog} onOpenChange={setShowNewSiteDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Site
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Site</DialogTitle>
                    <DialogDescription>
                      Create a new site to track safety and compliance.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Site Name</label>
                      <Input
                        placeholder="e.g., North Field Operations"
                        value={newSiteName}
                        onChange={(e) => setNewSiteName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Input
                        placeholder="e.g., Story County, IA"
                        value={newSiteLocation}
                        onChange={(e) => setNewSiteLocation(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddSite} className="w-full">Create Site</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {sites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-100 p-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Total Incidents</p>
                    <p className="text-2xl font-semibold">3</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-3">
                    <ClipboardCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Pending Audits</p>
                    <p className="text-2xl font-semibold">2</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-3">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Active Crews</p>
                    <p className="text-2xl font-semibold">8</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Wrench className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Equipment</p>
                    <p className="text-2xl font-semibold">24</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <AlertTriangle className="h-4 w-4" />
                    Report Incident
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <ClipboardCheck className="h-4 w-4" />
                    Start Audit
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <FileText className="h-4 w-4" />
                    Compliance Planning
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <TrendingUp className="h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-100 p-2 mt-0.5">
                      <AlertTriangle className="h-3 w-3 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Incident Reported</p>
                      <p className="text-xs text-stone-500">South Livestock Facility - Minor equipment malfunction</p>
                      <p className="text-xs text-stone-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-2 mt-0.5">
                      <ClipboardCheck className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Audit Completed</p>
                      <p className="text-xs text-stone-500">North Field Operations - Passed with minor notes</p>
                      <p className="text-xs text-stone-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2 mt-0.5">
                      <FileText className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Compliance Plan Updated</p>
                      <p className="text-xs text-stone-500">Q4 2025 safety protocols reviewed</p>
                      <p className="text-xs text-stone-400 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
