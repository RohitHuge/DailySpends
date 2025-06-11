import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Plus, Clock } from "lucide-react"



export default function FamilySetupModal({ onCreateFamily, onCheckForInvite }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[360px] shadow-lg border-0">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl">Welcome to DailySpends</CardTitle>
          <CardDescription className="text-sm">Let's get your family set up</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Button className="w-full py-6 text-base font-medium" onClick={onCreateFamily}>
            <Plus className="mr-2 h-5 w-5" />
            Create a New Family
          </Button>

          <div className="space-y-2">
            <Button variant="outline" className="w-full py-6 text-base font-medium" onClick={onCheckForInvite}>
              <Clock className="mr-2 h-5 w-5" />
              Check for Invitation
            </Button>
            <p className="text-sm text-muted-foreground text-center px-4">
              You'll be added once a family admin invites you.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
