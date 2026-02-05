import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BuyerPanel from "@/components/user/BuyerPanel"
import SellerPanel from "@/components/user/SellerPanel"

export default function UserCenter() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Center</h1>
          <p className="text-muted-foreground">Manage your account, orders, and products.</p>
        </div>
      </div>

      <Tabs defaultValue="buyer" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="buyer" className="px-8">Buyer Center</TabsTrigger>
          <TabsTrigger value="seller" className="px-8">Seller Workbench</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyer" className="space-y-4">
          <BuyerPanel />
        </TabsContent>
        
        <TabsContent value="seller" className="space-y-4">
          <SellerPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
