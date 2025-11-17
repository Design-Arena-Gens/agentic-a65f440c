import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, AlertTriangle, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SiteCardProps {
  site: {
    id: string
    name: string
    location: string
    status: string
    lastAudit: string
    incidents: number
  }
}

export function SiteCard({ site }: SiteCardProps) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-stone-900">{site.name}</h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-stone-500">
            <MapPin className="h-3.5 w-3.5" />
            <p className="text-sm">{site.location}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Start Audit</DropdownMenuItem>
            <DropdownMenuItem>View History</DropdownMenuItem>
            <DropdownMenuItem>Edit Site</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-stone-400" />
            <span className="text-stone-600">Last Audit</span>
          </div>
          <span className="text-sm font-medium text-stone-900">{site.lastAudit}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-stone-400" />
            <span className="text-stone-600">Incidents</span>
          </div>
          <Badge variant={site.incidents === 0 ? 'outline' : 'destructive'}>
            {site.incidents}
          </Badge>
        </div>

        <Badge
          variant="outline"
          className={site.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
        >
          {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
        </Badge>
      </div>
    </Card>
  )
}
