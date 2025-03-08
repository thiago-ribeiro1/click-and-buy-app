# 🛒 Click&Buy

Aplicação mobile desenvolvida em **React Native** que permite aos usuários se cadastrarem, efetuarem login, visualizar produtos, adicionar ao carrinho, remover produtos e finalizar pedidos.

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />

![Image](https://github.com/user-attachments/assets/6350e26d-4879-44fb-bd0a-02257937e99c)

## 📱 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **TypeScript** - Tipagem segura para JavaScript
- **React Navigation** - Navegação entre telas
- **Context API** - Gerenciamento de estado global

## 🚀 Funcionalidades

- Cadastro e login de usuários
- Listagem de produtos com preços promocionais
- Adição e remoção de itens no carrinho
- Atualização dinâmica do valor total no carrinho
- Finalização do pedido

## 📦 Principais Pacotes Utilizados

| Pacote                 | Descrição |
|------------------------|-----------|
| react-native          | Framework para desenvolvimento mobile |
| react-navigation      | Navegação entre telas |
| StackNavigationProp   | Tipagem para navegação stack no TypeScript |
| useEffect             | Hook para efeitos colaterais e ciclo de vida |
| useState              | Hook para gerenciar estados locais no React |

## 📂 Estrutura de Diretórios

```bash
ECOMMERCE-APP/
│── .expo/                # Diretório gerenciado pelo Expo
│── app/
│   └── index.tsx         # Arquivo de entrada principal
│── assets/               # Recursos do projeto (imagens, fontes, etc.)
│   ├── fonts/            # Arquivos de fontes personalizados
│   ├── images/           # Imagens padrão do React - Logo, Icon...
│   └── img/              # Imagens utilizadas na aplicação
│── components/           # Componentes reutilizáveis
│── constants/            # Constantes e configurações globais
│── hooks/                # Custom Hooks
│── node_modules/         # Dependências do projeto
│── scripts/              # Scripts auxiliares
│── src/                  # Código principal do app
│   ├── NavigationTypes/  # Tipos de navegação
│   ├── pages/            # Páginas do aplicativo
│   │   ├── Cart/         # Tela do carrinho
│   │   ├── HomeScreen/   # Tela principal
│   │   ├── Login/        # Tela de login
│   │   ├── OrderPlaced/  # Tela de pedido concluído
│   │   ├── Register/     # Tela de registro de usuário
│   │   └── SplashScreen/ # Tela de carregamento inicial
│── .gitignore            # Arquivo para ignorar arquivos no Git
│── app.json              # Configurações do aplicativo Expo
│── App.tsx               # Componente raiz do aplicativo
│── expo-env.d.ts         # Configurações de ambiente do Expo
│── package-lock.json     # Arquivo de bloqueio de versões do npm
│── package.json          # Configurações do projeto e dependências
│── tsconfig.json         # Configuração do TypeScript

```

## 📱 Telas do Aplicativo

### 🔹 Splash Screen
Tela inicial exibida enquanto o app é carregado.

### 🔹 Login & Cadastro
Tela para login e criação de novos usuários.

### 🔹 HomeScreen
Exibição dos produtos disponíveis.

### 🔹 Carrinho
Lista dos produtos adicionados ao carrinho, com opções para remover itens e finalizar a compra.

### 🔹 Pedido Finalizado
Informa ao usuário que o pedido foi finalizado, completando o processo de compra.

## 🛠 Como Utilizar

### 1️⃣ Pré-requisitos

- Node.js instalado (recomendável versão 23)
- Fazer download do app "Expo Go" para exibição da interface
- Expo CLI instalado:
  ```bash
  npm install -g expo-cli
  ```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Executar o App

Para iniciar o aplicativo, utilize:

```bash
npx expo start
```

Escaneie o QR Code e espere carregar a aplicação
