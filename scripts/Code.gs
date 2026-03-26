// ============================================================
//  ENTRY POINT — chamado pelo fetch do formulário HTML
// ============================================================

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    var sheet = getOrCreateSheet();

    // Salva imagens no Drive e obtém os links
    var fotoUrl      = salvarImagem(payload.fotoBase64,      payload.fotoNome,      'foto_'      + sanitize(payload.nome));
    var trabalhosUrl = salvarImagens(payload.trabalhosBase64,                        'portfolio_' + sanitize(payload.nome));

    var linha = [
      new Date(),
      payload.nome,
      payload.profissao,
      payload.email,
      payload.whatsapp,
      payload.tipo,
      payload.objetivo,
      payload.estilo,
      payload.cores,
      payload.corExata,
      payload.bio,
      payload.servicos,
      payload.depoimentos,
      fotoUrl,
      trabalhosUrl,
      payload.obsImagens,
      payload.instagram,
      payload.linkedin,
      payload.tiktok,
      payload.github,
      payload.whatsappSocial,
      payload.outroSocial,
      payload.referencias,
      payload.obsRef,
      payload.naoQuero,
    ];

    sheet.appendRow(linha);

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}


// ============================================================
//  IMAGENS
// ============================================================

function salvarImagem(base64, nomeArquivo, label) {
  if (!base64 || !nomeArquivo) return '';

  try {
    var folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
    var dados  = base64.indexOf(',') !== -1 ? base64.split(',')[1] : base64;
    var blob   = Utilities.newBlob(
      Utilities.base64Decode(dados),
      getMimeType(nomeArquivo),
      label + '_' + nomeArquivo
    );
    var arquivo = folder.createFile(blob);
    arquivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return arquivo.getUrl();
  } catch (err) {
    return 'Erro ao salvar: ' + err.message;
  }
}

function salvarImagens(lista, prefixo) {
  if (!lista || !lista.length) return '';

  var urls = lista.map(function (img, i) {
    return salvarImagem(img.base64, img.nome, prefixo + '_' + (i + 1));
  });

  return urls.filter(Boolean).join('\n');
}


// ============================================================
//  PLANILHA
// ============================================================

function getOrCreateSheet() {
  var ss    = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    criarCabecalho(sheet);
  } else if (sheet.getLastRow() === 0) {
    criarCabecalho(sheet);
  }

  return sheet;
}

function criarCabecalho(sheet) {
  var cabecalho = [
    'Data',
    'Nome',
    'Profissão',
    'E-mail',
    'WhatsApp',
    'Tipo de site',
    'Objetivo',
    'Estilo',
    'Cores',
    'Cor exata',
    'Bio / Apresentação',
    'Serviços / Trabalhos',
    'Depoimentos',
    'Foto / Logo (Drive)',
    'Portfólio (Drive)',
    'Obs. imagens',
    'Instagram',
    'LinkedIn',
    'TikTok',
    'GitHub',
    'WhatsApp (social)',
    'Outro social',
    'Sites de referência',
    'O que gosta nas referências',
    'Não quer no site',
  ];

  sheet.appendRow(cabecalho);

  // Formata o cabeçalho
  var range = sheet.getRange(1, 1, 1, cabecalho.length);
  range.setFontWeight('bold');
  range.setBackground('#1a1a1a');
  range.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}


// ============================================================
//  UTILITÁRIOS
// ============================================================

function getMimeType(fileName) {
  var ext   = fileName.split('.').pop().toLowerCase();
  var tipos = {
    jpg:  'image/jpeg',
    jpeg: 'image/jpeg',
    png:  'image/png',
    gif:  'image/gif',
    svg:  'image/svg+xml',
    webp: 'image/webp',
  };
  return tipos[ext] || 'application/octet-stream';
}

function sanitize(str) {
  return (str || 'sem-nome').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
