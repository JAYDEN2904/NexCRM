import { ChatSystem } from '@/components/communication/ChatSystem'

export function ChatPage() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Chat</h1>
        <p className="text-muted-foreground">
          Communicate with your team in real-time
        </p>
      </div>
      <div className="h-[calc(100vh-12rem)]">
        <ChatSystem />
      </div>
    </div>
  )
} 