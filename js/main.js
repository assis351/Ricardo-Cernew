  function nav(id){
    document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
    var target = document.getElementById(id);
    if(target) target.classList.add('active');
    document.querySelectorAll('.navlink').forEach(function(l){ l.classList.toggle('active', l.dataset.page === id); });
    window.scrollTo({top:0, behavior:'smooth'});
    var navEl = document.getElementById('primaryNav');
    navEl.classList.remove('open');
    document.getElementById('menuToggle').setAttribute('aria-expanded','false');
    try{ history.replaceState(null, '', '#' + id); }catch(e){}
  }

  document.getElementById('menuToggle').addEventListener('click', function(){
    var navEl = document.getElementById('primaryNav');
    var open = navEl.classList.toggle('open');
    this.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  (function initRoute(){
    var validPages = ['home','sobre','blog','agenda','contato'];
    var hash = (location.hash || '').replace('#','');
    nav(validPages.includes(hash) ? hash : 'home');
  })();

  document.getElementById('bookingForm').addEventListener('submit', function(e){
    e.preventDefault();
    var data = {
      nome: document.getElementById('f-nome').value,
      telefone: document.getElementById('f-telefone').value,
      email: document.getElementById('f-email').value,
      area: document.getElementById('f-area').value,
      formato: document.getElementById('f-formato').value,
      data: document.getElementById('f-data').value,
      horario: document.getElementById('f-horario').value,
      msg: document.getElementById('f-msg').value,
      ts: Date.now()
    };
    try{
      var list = JSON.parse(localStorage.getItem('bc_consultas') || '[]');
      list.push(data);
      localStorage.setItem('bc_consultas', JSON.stringify(list));
    }catch(err){ /* localStorage indisponível, segue sem persistir */ }

    document.getElementById('cf-nome').textContent = data.nome;
    document.getElementById('cf-area').textContent = data.area;
    document.getElementById('cf-formato').textContent = data.formato;
    var dataFmt = data.data ? new Date(data.data + 'T00:00:00').toLocaleDateString('pt-BR') : '';
    document.getElementById('cf-data').textContent = dataFmt;
    document.getElementById('cf-horario').textContent = data.horario;
    document.getElementById('cf-telefone').textContent = data.telefone;
    document.getElementById('cf-email').textContent = data.email;
    var whatsMsg = encodeURIComponent('Olá! Meu nome é ' + data.nome + '. Solicitei uma consulta de ' + data.area + ' para ' + dataFmt + ' (' + data.horario + ').');
    document.getElementById('cf-whats').href = 'https://wa.me/5511999048241?text=' + whatsMsg;
    var corpo = 'Olá, Dr. Ricardo!\n\nGostaria de agendar uma consulta.\n\n' +
      'Nome: ' + data.nome + '\n' +
      'Telefone/WhatsApp: ' + data.telefone + '\n' +
      'E-mail: ' + data.email + '\n' +
      'Área de interesse: ' + data.area + '\n' +
      'Formato: ' + data.formato + '\n' +
      'Data preferida: ' + dataFmt + '\n' +
      'Horário preferido: ' + data.horario + '\n' +
      (data.msg ? '\nSobre o caso:\n' + data.msg + '\n' : '');
    document.getElementById('cf-mail').href = 'mailto:ricardocernew@yahoo.com.br?subject=' +
      encodeURIComponent('Agendamento de consulta - ' + data.nome) + '&body=' + encodeURIComponent(corpo);

    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('confirmCard').classList.remove('hidden');
  });

  function resetBooking(){
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingForm').classList.remove('hidden');
    document.getElementById('confirmCard').classList.add('hidden');
  }
