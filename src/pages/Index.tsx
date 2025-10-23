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
      content: "Используйте CSS переменные для темизации: --color-primary: #3F7AFC; Легко менять и переиспользовать.",
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
    <div className="min-h-screen flex">
      <main className="flex-1 p-8 lg:pr-80">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">TECH PORTFOLIO</h1>
          <p className="text-muted-foreground text-lg">PHP • JavaScript • CSS</p>
        </header>

        <Tabs defaultValue="code" className="w-full" onValueChange={setActiveSection}>
          <TabsList className="mb-8">
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

          <TabsContent value="code" className="space-y-6">
            {codeSnippets.map((snippet, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{snippet.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{snippet.language}</Badge>
                      {snippet.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(snippet.code, snippet.title)}
                    className="gap-2"
                  >
                    <Icon name="Copy" size={16} />
                    Copy
                  </Button>
                </div>
                <pre className="bg-secondary text-secondary-foreground p-4 rounded-lg overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            {tips.map((tip, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={tip.icon as any} size={24} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground">{tip.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="links" className="space-y-4">
            {links.map((link, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="ExternalLink" size={20} className="text-primary" />
                      <h3 className="text-lg font-semibold">{link.title}</h3>
                      <Badge>{link.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{link.description}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="humor" className="space-y-4">
            {humor.map((joke, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="text-4xl">{joke.emoji}</div>
                  <div className="flex-1">
                    <pre className="whitespace-pre-wrap font-sans text-foreground">{joke.text}</pre>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <aside className="fixed right-0 top-0 bottom-0 w-80 bg-sidebar text-sidebar-foreground p-8 overflow-y-auto border-l border-sidebar-border">
        <nav className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Меню</h2>
            <p className="text-sidebar-foreground/70 text-sm">Навигация по разделам</p>
          </div>

          <div className="space-y-2">
            <Button
              variant={activeSection === "code" ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("code")}
            >
              <Icon name="Code2" size={18} />
              Код-сниппеты
            </Button>
            <Button
              variant={activeSection === "tips" ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("tips")}
            >
              <Icon name="Lightbulb" size={18} />
              Советы
            </Button>
            <Button
              variant={activeSection === "links" ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("links")}
            >
              <Icon name="Link" size={18} />
              Полезные ссылки
            </Button>
            <Button
              variant={activeSection === "humor" ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("humor")}
            >
              <Icon name="Smile" size={18} />
              Юмор
            </Button>
          </div>

          <div className="pt-6 border-t border-sidebar-border space-y-4">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Github" size={18} />
                GitHub
              </h3>
              <Button variant="outline" className="w-full" size="sm">
                <Icon name="Github" size={16} className="mr-2" />
                Мой профиль
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Coffee" size={18} />
                Контакты
              </h3>
              <div className="space-y-2 text-sm text-sidebar-foreground/70">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <span>dev@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Globe" size={14} />
                  <span>myportfolio.dev</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Users" size={18} />
                Соцсети
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Icon name="Twitter" size={16} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Linkedin" size={16} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/50 text-center">
              © 2024 Tech Portfolio
            </p>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Index;
