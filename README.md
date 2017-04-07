# SigaaAddon
Extensão para navegadores baseados em Chromium com adicionais para si3

**O que isso adiciona no Sigaa?**<br>
Bem, por hora, esta extensão habilita o login no si3 pelo Chromium,
adiciona um link no rodapé das diciplinas que dá acesso a uma tabela de horários e
permiti fazer uma tabela de horários na página de [busca de turmas](https://si3.ufc.br/sigaa/ensino/turma/busca_turma.jsf#).     

**Para adicionar SigaaAddon ao Chromium:**<br>

* Alternativa 1 (pelo binário):

Baixe a extensão [aqui](https://github.com/LaercioSantana/SigaaAddon/blob/master/bin/SigaaAddon.crx?raw=true)<br>
Acesse pelo navegador "chrome://extensions/" <br>
Clique e arraste o arquivo baixado anteriomente para o navegador <br>

* Alternativa 2 (modo desenvolvedor):

Acesse pelo navegador "chrome://extensions/"<br>
Habilite o modo desenvolvedor marcando o checkbox "modo desenvolvedor"<br>
Aperte o botão "Carregar extensão expandida", e selecione a pasta SigaaAddon.<br>


**Como adicionar SigaaAddon ao Firefox:**<br>
Ainda não empacotamos esta extensão para ao Firefox, mas não fique triste, ainda há um caminho…<br>
- Primeiro acesse o si3 pelo Firefox
- No menu discente, aperte SHIFT+CTRL+I e clique na aba console
- Agora copie o código do [inject.js](https://github.com/LaercioSantana/SigaaAddon/blob/master/SigaaAddon/inject.js) e cole no console do Firefox, de ENTER
- Pronto, agora um link "Ver horario" foi adicionado ao rodapé do quadro "Turmas do semestre"

**Screenshots**
![Sigaa Addon show schedule](https://raw.githubusercontent.com/LaercioSantana/SigaaAddon/master/Screenshots/horarios.png)
![Sigaa Addon show schedule in 'busca turmas'](https://raw.githubusercontent.com/LaercioSantana/SigaaAddon/master/Screenshots/horarios_busca_turma.png)
