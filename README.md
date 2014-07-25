#Boilerplate Web

Estrutura padrão que serve como base para início de projetos web. 

Task Runner utilizado: [GruntJS](http://gruntjs.com/  "The JavaScript Task Runner").

##Plugins GruntJS utilizados

* **matchdep**
* **watch**
* **compass**
* **concat**
* **uglify**
* **imagemin**
* **browserSync**

##Tarefas configuradas

* **grunt**      - Default que executa a tarefa "Watch"
* **grunt img**  - Executa apenas a tarefa "imagemin" para otimização das imagens
* **grunt src**  - Executa as tarefas p/ ambiente de desenvolvimento
* **grunt dist** - Executa as tarefas p/ ambiente de produção

##Como usar

1. Clonar o repositório:
  	
		git clone git@github.com:sergiohampel/boilerplate-web.git


2. Instalar as dependências do GruntJS:

		npm install

3. Executar a tarefa desejada (grunt...)

##Como funciona

Ao rodar o comando **grunt**, a tarefa watch é iniciada. Você está pronto para começar a trabalhar com **css**, **js** e as **imagens**.

O diretório **src** contém todos os arquivos fonte, ou seja, são os assets que devem ser trabalhados no ambiente de desenvolvimento, adicionar/alterar/remover arquivo.

O diretório **dist** contém os assets que são gerados dinamicamente após executar o comando **grunt dist**.
