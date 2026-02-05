import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BuyerPanel from "@/components/user/BuyerPanel"
import SellerPanel from "@/components/user/SellerPanel"

export default function UserCenter() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">User Center</h1>
          <p className="text-muted-foreground">Manage your purchases and sales.</p>
        </div>
      </div>

      <Tabs defaultValue="buyer" className="space-y-4">
        <TabsList>
          <TabsTrigger value="buyer">I am a Buyer</TabsTrigger>
          <TabsTrigger value="seller">I am a Seller</TabsTrigger>
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
