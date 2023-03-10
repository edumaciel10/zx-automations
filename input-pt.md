---
id: plugin
title: Plugin
tags:
- plugin
---
A OpenPix possui 2 plugins para ser utilizados em seu negócio, o Plugin de `Order` e o Plugin de `Widget`.

## O que é necessário saber antes de utilizar os plugins?

- É necessário entender que para utilizar as API's e plugins disponibilizados dentro da OpenPix você precisa ter um AppID válido, veja como criar [aqui](./app-id).

- Ao tentar consumir o plugin para criar uma cobrança você precisa gerar um correlationID único, para conseguir buscar essa cobrança dentro da OpenPix, se você não informar um novo correlationID para uma nova cobrança, sera mostrado a cobrança anterior relacionada a esse correlationID

## Começando com o Plugin de `Widget`

O Plugin de `Widget` permite criar facilmente cobranças Pix dentro do seu frontend Javascript.
E deve ser utilizado quando a cobrança ainda precisa ser criada na OpenPix.

### Criando o Plugin de `Widget`

A primeira coisa é incluir a tag de script do plugin OpenPix na parte inferior do arquivo html

```html
<script src="https://plugin.openpix.com.br/v1/openpix.js" async>
```

O script pode ser importado dentro de um arquivo `.html`. Por exemplo, se seu aplicativo for um aplicativo em React, o script do Plugin OpenPix será importado dentro de `index.html`.

Veja o exemplo abaixo:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Demo OpenPix Plugin</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://plugin.openpix.com.br/v1/openpix.js" async></script>
  </body>
</html>
```

Até este momento, nada deve acontecer, pois o plugin não foi inicializado.
Para confirmar se o plugin foi inicializado corretamente, você pode acessar o console do seu navegador e buscar por esses logs

```
[OpenPix] connecting, attemp 0
[OpenPix] connected
```
