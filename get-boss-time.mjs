#!/usr/bin/env zx

import { $ } from "zx";
console.log(process.argv);
const lista = process.argv[3]
  .split("\n")
  .map((item) => item.trim())
  .map((item) => item.replace(/\s\s+/g, " "));

// replace more than one space with one space
// Função para extrair horas e minutos
function extrairHorario(texto) {
  const padrao = /(\d{2}):(\d{2})/;
  const resultado = padrao.exec(texto);
  if (resultado) {
    const horas = parseInt(resultado[1]);
    const minutos = parseInt(resultado[2]);
    return { horas, minutos };
  }
  return null;
}

// Função para formatar horário
function formatarHorario(horas, minutos) {
  return (
    horas.toString().padStart(2, "0") +
    ":" +
    minutos.toString().padStart(2, "0")
  );
}

// Função para calcular o intervalo de horários
function calcularIntervalo(lista) {
  const resultado = [];
  const dataReferencia = new Date(lista[0].split(" ")[4]); // Considerando a data da primeira linha como referência

  for (let i = 0; i < lista.length; i++) {
    const linha = lista[i];
    const partes = linha.split(" ");
    const horario = extrairHorario(partes[3]);

    if (horario) {
      const data = partes[4];
      const horas = horario.horas;
      const minutos = horario.minutos;
      const horarioInicio = formatarHorario(horas, minutos);
      const horarioFim1 = formatarHorario((horas + 8) % 24, minutos);
      const horarioFim2 = formatarHorario((horas + 12) % 24, minutos);
      const dataFim =
        dataReferencia.getDate() + 1 === parseInt(data.split("/")[0])
          ? dataReferencia.toLocaleDateString()
          : data;
      const intervalo = `${horarioFim1} as ${horarioFim2} ${dataFim}`;
      const sala = [partes[0], partes[1], partes[2]].join(" ");
      resultado.push(`${sala} : ${intervalo}`);
    }
  }

  return resultado;
}

// Executar função e mostrar resultado
const resultado = calcularIntervalo(lista);
resultado.forEach((item) => console.log(item));
