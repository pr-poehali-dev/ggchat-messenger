import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

type Contact = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
};

type ContactsViewProps = {
  contacts: Contact[];
};

const ContactsView = ({ contacts }: ContactsViewProps) => {
  return (
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
          {contacts.map((contact) => (
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
  );
};

export default ContactsView;
