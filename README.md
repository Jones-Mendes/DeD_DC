# 🐉 Gerador de NPCs D&D 5e

Sistema web para geração de personagens não-jogadores (NPCs) de Dungeons & Dragons 5ª Edição, desenvolvido com React, Vite e Tailwind CSS.

<img width="1637" height="850" alt="image" src="https://github.com/user-attachments/assets/1d863b9c-c8b7-4cd8-a089-86ce9699534b" />


## ✨ Funcionalidades

- **Geração Aleatória Completa**: Crie NPCs completos com raça, classe, atributos, background e personalidade
- **Múltiplos Métodos de Atributos**: 
  - Rolagem 4d6 drop lowest (método tradicional)
  - Standard Array (distribuição balanceada)
- **Customização**: 
  - Escolha raça, classe ou background específicos
  - Defina o nível do personagem (1-20)
  - Selecione o gênero
- **Gerenciamento de NPCs**:
  - Salvar NPCs favoritos no navegador
  - Histórico da sessão atual
  - Exportar para arquivo de texto
  - Copiar para área de transferência
- **Interface Temática**: Design inspirado em D&D com elementos medievais e fantásticos

## 🎲 Conteúdo D&D Incluído

### Raças
Humano, Elfo, Anão, Halfling, Meio-Elfo, Meio-Orc, Tiefling, Draconato, Gnomo

### Classes
Guerreiro, Mago, Clérigo, Ladino, Ranger, Paladino, Bárbaro, Bardo, Druida, Feiticeiro, Monge, Bruxo

### Backgrounds
Acólito, Criminoso, Herói do Povo, Nobre, Sábio, Soldado, Artesão de Guilda, Eremita, Forasteiro, Artista

<img width="1149" height="865" alt="image" src="https://github.com/user-attachments/assets/eceb5821-0da9-4fdf-afe0-7f940a853b7c" />


## 🚀 Como Usar

### Instalação

```bash
# As dependências já foram instaladas
npm install
```

### Executar o Projeto

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto será aberto em `http://localhost:5173`

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Visualizar build de produção
npm run preview
```

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para interfaces
- **Vite**: Build tool moderno e rápido
- **Tailwind CSS**: Framework CSS utility-first
- **JavaScript ES6+**: Lógica de geração procedural

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── GeneratorForm.jsx    # Formulário de configuração
│   ├── NPCCard.jsx          # Cartão de exibição do NPC
│   ├── NPCActions.jsx       # Botões de ação (salvar/exportar)
│   └── SavedNPCsList.jsx    # Lista de NPCs salvos
├── data/                # Dados de D&D
│   └── dndData.js           # Raças, classes, backgrounds, nomes
├── utils/               # Utilitários
│   ├── diceUtils.js         # Funções de rolagem de dados
│   ├── npcGenerator.js      # Lógica principal de geração
│   └── dnd5eAPI.js          # Integração com D&D 5e API
├── App.jsx              # Componente principal
├── index.css            # Configuração Tailwind
└── main.jsx             # Ponto de entrada
```

## 🎮 Como Funciona

1. **Configure as Opções**: Escolha nível, método de atributos e personalizações
2. **Gere o NPC**: Clique em "Gerar NPC" para criar um personagem aleatório
3. **Visualize**: Veja todos os atributos, características e personalidade
4. **Salve ou Exporte**: Salve no navegador ou exporte para usar em suas sessões

## 📊 Cálculos Baseados em D&D 5e

- Modificadores de atributo: `(Atributo - 10) / 2`
- HP Nível 1: `Dado de Vida da Classe + Modificador de Constituição`
- Bônus de Proficiência: Baseado no nível do personagem
- Classe de Armadura base: `10 + Modificador de Destreza`

## 🎨 Tema Visual

Interface com:
- Cores medievais (âmbar, pedra, madeira escura)
- Fonte decorativa para títulos (Cinzel)
- Efeitos de hover e animações suaves
- Design responsivo para mobile e desktop

## 📝 Licença

Este é um projeto educacional baseado nas regras do Dungeons & Dragons 5ª Edição. D&D é marca registrada da Wizards of the Coast.

## 🤝 Contribuindo

Sinta-se livre para sugerir melhorias ou adicionar novos conteúdos de D&D!

---

⚔️ **Boas aventuras e que seus dados sempre rolem 20 natural!** 🎲

