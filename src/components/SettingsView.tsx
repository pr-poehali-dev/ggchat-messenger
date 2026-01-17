import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const SettingsView = () => {
  const settingsItems = [
    { icon: 'Bell', title: 'Уведомления', desc: 'Настройка звуков и оповещений' },
    { icon: 'Lock', title: 'Приватность', desc: 'Управление конфиденциальностью' },
    { icon: 'Palette', title: 'Тема', desc: 'Светлая или темная тема' },
    { icon: 'Globe', title: 'Язык', desc: 'Выбор языка интерфейса' },
    { icon: 'Database', title: 'Данные', desc: 'Управление хранилищем' },
  ];

  return (
    <div className="flex-1 flex flex-col animate-fade-in">
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Настройки
        </h2>
      </div>
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-2xl space-y-4">
          {settingsItems.map((item, index) => (
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
  );
};

export default SettingsView;
