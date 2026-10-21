/* =========================================================
   CONFIGURAÇÃO DO SITE — edite aqui nome, contatos e mensagens.
   As páginas leem estes dados ao carregar.
   ========================================================= */
window.SITE = {
  nome: "Presença Pro",
  slogan: "Sua empresa mais forte no digital",
  email: "presencaproonline@gmail.com",

  logo: {
    completa: "assets/logo-completa.webp", // símbolo + nome (rodapé)
    simbolo: "assets/logo-simbolo.webp",   // só o "P" (cabeçalho)
    nome: "assets/logo-nome.webp"          // só o nome (cabeçalho)
  },

  // Os dois números oficiais. Rótulos podem ser trocados à vontade.
  // ATENÇÃO: confirme o WhatsApp 2 antes de publicar (veja COMO-PUBLICAR.txt).
  whatsapp: [
    { rotulo: "Falar pelo WhatsApp 1", numero: "(13) 99692-3853", link: "https://wa.me/5513996923853" },
    { rotulo: "Falar pelo WhatsApp 2", numero: "(35) 99269-7647",  link: "https://wa.me/5535992697647" }
  ],

  // Mensagem inicial que já aparece escrita ao abrir o WhatsApp.
  mensagens: {
    geral:     "Olá! Gostaria de conhecer os serviços da Presença Pro.",
    site:      "Olá! Gostaria de um orçamento para criar o site da minha empresa.",
    landing:   "Olá! Gostaria de um orçamento para uma landing page.",
    anuncio:   "Olá! Gostaria de anunciar minha empresa com a Presença Pro.",
    marketing: "Olá! Gostaria de saber mais sobre o marketing digital da Presença Pro."
  }
};
