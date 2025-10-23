import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const Index = () => {
  const [activeSection, setActiveSection] = useState("code");

  const codeSnippets = [
    {
      title: "PHP: Простой роутер",
      language: "PHP",
      code: `// Минималистичный роутер
class Router {
  private $routes = [];
  
  public function get($path, $callback) {
    $this->routes['GET'][$path] = $callback;
  }
  
  public function post($path, $callback) {
    $this->routes['POST'][$path] = $callback;
  }
  
  public function dispatch() {
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    if (isset($this->routes[$method][$path])) {
      call_user_func($this->routes[$method][$path]);
    } else {
      http_response_code(404);
      echo "404 Not Found";
    }
  }
}`,
      tags: ["routing", "clean-code"]
    },
    {
      title: "JS: Debounce функция",
      language: "JavaScript",
      code: `// Оптимизация частых вызовов
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// Использование
const search = debounce((query) => {
  console.log('Поиск:', query);
}, 300);`,
      tags: ["performance", "optimization"]
    },
    {
      title: "CSS: Центрирование",
      language: "CSS",
      code: `/* Современное центрирование */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-grid {
  display: grid;
  place-items: center;
}

/* Абсолютное центрирование */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
      tags: ["layout", "flexbox", "grid"]
    }
  ];

  const tips = [
    {
      title: "Не используйте var в JS",
      content: "Всегда используйте const или let. var имеет проблемы со scope и может привести к багам.",
      icon: "AlertTriangle"
    },
    {
      title: "PHP 8.x named arguments",
      content: "Именованные аргументы делают код читаемым: htmlspecialchars($string, double_encode: false, encoding: 'UTF-8')",
      icon: "Lightbulb"
    },
    {
      title: "CSS custom properties",
      content: "Используйте CSS переменные для темизации: --color-primary: #E74C3C; Легко менять и переиспользовать.",
      icon: "Palette"
    },
    {
      title: "Async/await вместо промисов",
      content: "Async/await делает асинхронный код линейным и понятным. Забудьте про .then() цепочки.",
      icon: "Zap"
    }
  ];

  const links = [
    {
      title: "PHP: The Right Way",
      url: "https://phptherightway.com/",
      description: "Лучшие практики PHP разработки",
      category: "PHP"
    },
    {
      title: "JavaScript.info",
      url: "https://javascript.info/",
      description: "Современный учебник JavaScript",
      category: "JavaScript"
    },
    {
      title: "CSS-Tricks",
      url: "https://css-tricks.com/",
      description: "Гайды, трюки и решения по CSS",
      category: "CSS"
    },
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      description: "Документация по веб-технологиям",
      category: "Docs"
    }
  ];

  const humor = [
    {
      text: "Есть два типа программистов: те, кто пишут комментарии, и те, кто придумывают отговорки почему их нет.",
      emoji: "😄"
    },
    {
      text: "// TODO: исправить этот костыль\n// Костыль от 2019 года работает до сих пор",
      emoji: "🤷"
    },
    {
      text: "Программист: 'Работает на моей машине'\nDevOps: 'Тогда отправим твою машину в прод'",
      emoji: "🚀"
    },
    {
      text: "99 bugs in the code,\n99 bugs in the code,\nTake one down, patch it around,\n117 bugs in the code.",
      emoji: "🐛"
    }
  ];

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${title} скопирован!`);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <main className="flex-1 p-6 lg:p-12 lg:pr-96">
        <header className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3 text-foreground tracking-tight">TECH PORTFOLIO</h1>
          <p className="text-muted-foreground text-xl font-semibold">PHP • JavaScript • CSS</p>
        </header>

        <Tabs defaultValue="code" className="w-full" onValueChange={setActiveSection}>
          <TabsList className="mb-8 bg-card border border-border">
            <TabsTrigger value="code" className="gap-2">
              <Icon name="Code2" size={18} />
              Код-сниппеты
            </TabsTrigger>
            <TabsTrigger value="tips" className="gap-2">
              <Icon name="Lightbulb" size={18} />
              Советы
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-2">
              <Icon name="Link" size={18} />
              Ссылки
            </TabsTrigger>
            <TabsTrigger value="humor" className="gap-2">
              <Icon name="Smile" size={18} />
              Юмор
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-6 animate-fade-in">
            {codeSnippets.map((snippet, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover-scale border-2 border-transparent hover:border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{snippet.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-sm px-3 py-1">{snippet.language}</Badge>
                      {snippet.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-sm px-3 py-1">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(snippet.code, snippet.title)}
                    className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Icon name="Copy" size={16} />
                    Copy
                  </Button>
                </div>
                <div className="bg-secondary/10 border-2 border-secondary/20 rounded-lg p-5 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-foreground">{snippet.code}</code>
                  </pre>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tips" className="space-y-5 animate-fade-in">
            {tips.map((tip, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover-scale border-2 border-transparent hover:border-primary/20">
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                      <Icon name={tip.icon as any} size={28} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{tip.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">{tip.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="links" className="space-y-5 animate-fade-in">
            {links.map((link, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover-scale border-2 border-transparent hover:border-primary/20">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="ExternalLink" size={22} className="text-primary flex-shrink-0" />
                      <h3 className="text-xl font-bold text-foreground">{link.title}</h3>
                      <Badge className="bg-primary/10 text-primary border border-primary/30">{link.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4 text-base leading-relaxed">{link.description}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-semibold inline-flex items-center gap-1 story-link"
                    >
                      {link.url}
                      <Icon name="ArrowUpRight" size={14} />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="humor" className="space-y-5 animate-fade-in">
            {humor.map((joke, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover-scale border-2 border-transparent hover:border-primary/20">
                <div className="flex gap-5">
                  <div className="text-5xl flex-shrink-0">{joke.emoji}</div>
                  <div className="flex-1">
                    <pre className="whitespace-pre-wrap font-sans text-foreground text-base leading-relaxed">{joke.text}</pre>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <aside className="hidden lg:block fixed right-0 top-0 bottom-0 w-80 bg-sidebar text-sidebar-foreground p-8 overflow-y-auto shadow-2xl">
        <nav className="space-y-8">
          <div className="pb-6 border-b border-sidebar-border">
            <h2 className="text-3xl font-bold mb-2 text-sidebar-foreground">Меню</h2>
            <p className="text-sidebar-foreground/70 text-sm font-semibold">Навигация по разделам</p>
          </div>

          <div className="space-y-3">
            <Button
              variant={activeSection === "code" ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-12 text-base font-semibold transition-all hover:scale-105"
              onClick={() => setActiveSection("code")}
            >
              <Icon name="Code2" size={20} />
              Код-сниппеты
            </Button>
            <Button
              variant={activeSection === "tips" ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-12 text-base font-semibold transition-all hover:scale-105"
              onClick={() => setActiveSection("tips")}
            >
              <Icon name="Lightbulb" size={20} />
              Советы
            </Button>
            <Button
              variant={activeSection === "links" ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-12 text-base font-semibold transition-all hover:scale-105"
              onClick={() => setActiveSection("links")}
            >
              <Icon name="Link" size={20} />
              Полезные ссылки
            </Button>
            <Button
              variant={activeSection === "humor" ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-12 text-base font-semibold transition-all hover:scale-105"
              onClick={() => setActiveSection("humor")}
            >
              <Icon name="Smile" size={20} />
              Юмор
            </Button>
          </div>

          <div className="pt-6 border-t border-sidebar-border space-y-6">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                <Icon name="Github" size={20} />
                GitHub
              </h3>
              <Button variant="outline" className="w-full h-11 font-semibold hover:bg-sidebar-accent">
                <Icon name="Github" size={18} className="mr-2" />
                Мой профиль
              </Button>
            </div>

            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                <Icon name="Mail" size={20} />
                Контакты
              </h3>
              <div className="space-y-3 text-sm text-sidebar-foreground/80 font-semibold">
                <div className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent transition-colors">
                  <Icon name="Mail" size={16} />
                  <span>dev@example.com</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent transition-colors">
                  <Icon name="Globe" size={16} />
                  <span>myportfolio.dev</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                <Icon name="Users" size={20} />
                Соцсети
              </h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="h-11 w-11 hover:bg-sidebar-accent hover:scale-110 transition-all">
                  <Icon name="Twitter" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11 hover:bg-sidebar-accent hover:scale-110 transition-all">
                  <Icon name="Linkedin" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11 hover:bg-sidebar-accent hover:scale-110 transition-all">
                  <Icon name="MessageCircle" size={18} />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/50 text-center font-semibold">
              © 2024 Tech Portfolio
            </p>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Index;