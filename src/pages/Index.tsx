import { useState } from 'react';
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
};

type Contact = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
};

type Story = {
  id: number;
  name: string;
  avatar: string;
  viewed: boolean;
};

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Иванова', avatar: '👩', lastMessage: 'Привет! Как дела?', time: '12:45', unread: 3, online: true },
  { id: 2, name: 'Команда GG', avatar: '👥', lastMessage: 'Встреча в 15:00', time: '11:20', unread: 0, online: false },
  { id: 3, name: 'Дмитрий', avatar: '👨', lastMessage: 'Отправил файлы', time: 'Вчера', unread: 1, online: true },
  { id: 4, name: 'Мама', avatar: '👩‍🦰', lastMessage: 'Не забудь позвонить', time: 'Вчера', unread: 0, online: false },
];

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '12:40' },
  { id: 2, text: 'Отлично! А у тебя?', sender: 'me', time: '12:42' },
  { id: 3, text: 'Тоже хорошо! Хотела спросить про встречу', sender: 'other', time: '12:43' },
  { id: 4, text: 'Да, конечно! Во сколько удобно?', sender: 'me', time: '12:44' },
  { id: 5, text: 'В 15:00 подойдет?', sender: 'other', time: '12:45' },
];

const mockContacts: Contact[] = [
  { id: 1, name: 'Анна Иванова', avatar: '👩', status: 'В сети', online: true },
  { id: 2, name: 'Дмитрий', avatar: '👨', status: 'В сети', online: true },
  { id: 3, name: 'Елена', avatar: '👱‍♀️', status: 'Была 5 минут назад', online: false },
  { id: 4, name: 'Максим', avatar: '👦', status: 'Был час назад', online: false },
];

const mockStories: Story[] = [
  { id: 1, name: 'Анна', avatar: '👩', viewed: false },
  { id: 2, name: 'Дмитрий', avatar: '👨', viewed: false },
  { id: 3, name: 'Команда', avatar: '👥', viewed: true },
  { id: 4, name: 'Елена', avatar: '👱‍♀️', viewed: false },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'stories' | 'profile' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      <div className="w-20 bg-sidebar flex flex-col items-center py-6 gap-6 border-r border-sidebar-border">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold animate-scale-in">
          GG
        </div>
        
        <nav className="flex flex-col gap-4 flex-1">
          <Button
            variant={activeTab === 'chats' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
            onClick={() => setActiveTab('chats')}
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
            onClick={() => setActiveTab('contacts')}
          >
            <Icon name="Users" size={24} />
          </Button>
          <Button
            variant={activeTab === 'stories' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
            onClick={() => setActiveTab('stories')}
          >
            <Icon name="Zap" size={24} />
          </Button>
        </nav>

        <div className="flex flex-col gap-4">
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
            onClick={() => setActiveTab('settings')}
          >
            <Icon name="Settings" size={24} />
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12 rounded-2xl transition-all hover:scale-110"
            onClick={() => setActiveTab('profile')}
          >
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarFallback className="bg-gradient-to-br from-accent to-secondary text-white">🚀</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>

      {activeTab === 'chats' && (
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
                {mockChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
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
                    {mockMessages.map((message, index) => (
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
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 rounded-3xl bg-muted border-0 px-6"
                    />
                    <Button size="icon" variant="ghost" className="rounded-2xl hover:scale-110 transition-all">
                      <Icon name="Smile" size={20} />
                    </Button>
                    <Button
                      size="icon"
                      className="rounded-2xl bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-all"
                      onClick={handleSendMessage}
                    >
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {activeTab === 'contacts' && (
        <div className="flex-1 flex flex-col animate-fade-in">
          <div className="p-6 border-b border-border bg-card">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Контакты
            </h2>
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск контактов..." className="pl-10 rounded-2xl bg-muted border-0" />
            </div>
          </div>
          <ScrollArea className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-6 rounded-3xl bg-card border border-border hover:border-primary transition-all cursor-pointer hover:scale-105 animate-scale-in"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-3xl">{contact.avatar}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.status}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-secondary">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-2xl">
                      <Icon name="Phone" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {activeTab === 'stories' && (
        <div className="flex-1 flex flex-col animate-fade-in">
          <div className="p-6 border-b border-border bg-card">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Статусы
            </h2>
          </div>
          <ScrollArea className="flex-1 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockStories.map((story) => (
                <div
                  key={story.id}
                  className="cursor-pointer group animate-scale-in hover:scale-105 transition-all"
                >
                  <div
                    className={`relative mb-2 rounded-3xl p-1 ${
                      story.viewed
                        ? 'bg-muted'
                        : 'bg-gradient-to-br from-primary via-secondary to-accent'
                    }`}
                  >
                    <Avatar className="w-full aspect-square">
                      <AvatarFallback className="text-5xl">{story.avatar}</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-sm text-center font-medium">{story.name}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
          <div className="max-w-md w-full p-8 rounded-3xl bg-card border border-border">
            <div className="text-center mb-8">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
                <AvatarFallback className="text-6xl bg-gradient-to-br from-primary to-secondary">🚀</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">Мой профиль</h2>
              <p className="text-muted-foreground">user@ggchat.com</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Имя пользователя</p>
                <p className="font-semibold">@myusername</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Статус</p>
                <p className="font-semibold">В сети</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-sm text-muted-foreground mb-1">О себе</p>
                <p className="font-semibold">Люблю общаться в GGchat! 🚀</p>
              </div>
              <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary">
                Редактировать профиль
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="flex-1 flex flex-col animate-fade-in">
          <div className="p-6 border-b border-border bg-card">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Настройки
            </h2>
          </div>
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-2xl space-y-4">
              {[
                { icon: 'Bell', title: 'Уведомления', desc: 'Настройка звуков и оповещений' },
                { icon: 'Lock', title: 'Приватность', desc: 'Управление конфиденциальностью' },
                { icon: 'Palette', title: 'Тема', desc: 'Светлая или темная тема' },
                { icon: 'Globe', title: 'Язык', desc: 'Выбор языка интерфейса' },
                { icon: 'Database', title: 'Данные', desc: 'Управление хранилищем' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-3xl bg-card border border-border hover:border-primary transition-all cursor-pointer hover:scale-105 flex items-center gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name={item.icon as any} size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={24} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Index;
