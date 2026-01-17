import { useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

type ChatViewProps = {
  chats: Chat[];
  selectedChat: Chat | null;
  newMessage: string;
  onChatSelect: (chat: Chat) => void;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
};

const ChatView = ({ 
  chats, 
  selectedChat, 
  newMessage, 
  onChatSelect, 
  onMessageChange, 
  onSendMessage 
}: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  return (
    <>
      <div className="w-96 border-r border-border bg-card flex flex-col animate-slide-in-left">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Чаты
          </h2>
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск..." className="pl-10 rounded-2xl bg-muted border-0" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className={`w-full p-4 rounded-2xl mb-2 transition-all hover:bg-muted flex items-center gap-3 ${
                  selectedChat?.id === chat.id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="ml-2 bg-primary">{chat.unread}</Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col animate-fade-in">
        {selectedChat && (
          <>
            <div className="p-6 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">{selectedChat.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedChat.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedChat.online ? 'В сети' : 'Не в сети'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-2xl hover:scale-110 transition-all">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-2xl hover:scale-110 transition-all">
                  <Icon name="Video" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-2xl hover:scale-110 transition-all">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {selectedChat.messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-slide-in-right`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className={`max-w-md px-6 py-3 rounded-3xl ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="mb-1">{message.text}</p>
                      <span className={`text-xs ${message.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border bg-card">
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="rounded-2xl hover:scale-110 transition-all">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <Input
                  placeholder="Напишите сообщение..."
                  value={newMessage}
                  onChange={(e) => onMessageChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                  className="flex-1 rounded-3xl bg-muted border-0 px-6"
                />
                <Button size="icon" variant="ghost" className="rounded-2xl hover:scale-110 transition-all">
                  <Icon name="Smile" size={20} />
                </Button>
                <Button
                  size="icon"
                  className="rounded-2xl bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-all"
                  onClick={onSendMessage}
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatView;
