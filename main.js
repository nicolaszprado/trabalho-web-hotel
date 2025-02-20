// Dados
let quartos = [
    {
        id: 1,
        nome: 'Quarto Standard',
        descricao: 'Confortável quarto com vista para a cidade',
        preco: 200,
        imagem: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
        id: 2,
        nome: 'Quarto Luxo',
        descricao: 'Espaçoso quarto com varanda privativa',
        preco: 350,
        imagem: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
        id: 3,
        nome: 'Suíte Presidencial',
        descricao: 'Nossa mais exclusiva acomodação',
        preco: 500,
        imagem: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
];

const servicos = [
    {
        nome: 'Restaurante',
        descricao: 'Gastronomia internacional',
        icone: '🍽️'
    },
    {
        nome: 'Spa',
        descricao: 'Relaxamento e bem-estar',
        icone: '💆‍♀️'
    },
    {
        nome: 'Academia',
        descricao: 'Equipamentos modernos',
        icone: '💪'
    },
    {
        nome: 'Piscina',
        descricao: 'Área de lazer completa',
        icone: '🏊‍♂️'
    }
];

// Configuração do Menu Mobile
function configurarMenuMobile() {
    // Cria o botão de toggle do menu
    const botaoMenu = document.createElement('div');
    botaoMenu.className = 'menu-toggle';
    botaoMenu.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    const linksNav = document.querySelector('.nav-links');
    
    nav.insertBefore(botaoMenu, linksNav);
    
    // Adiciona evento de clique para mostrar/esconder menu
    botaoMenu.addEventListener('click', () => {
        linksNav.classList.toggle('active');
        botaoMenu.innerHTML = linksNav.classList.contains('active') ? '✕' : '☰';
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            linksNav.classList.remove('active');
            botaoMenu.innerHTML = '☰';
        }
    });
}

// Configuração do Modo Escuro
function configurarModoEscuro() {
    // Cria o botão de toggle do modo escuro
    const botaoModoEscuro = document.createElement('button');
    botaoModoEscuro.className = 'dark-mode';
    botaoModoEscuro.innerHTML = '🌙';
    document.body.appendChild(botaoModoEscuro);

    // Verifica se o modo escuro estava ativo
    const modoEscuroAtivo = localStorage.getItem('modoEscuro') === 'true';
    if (modoEscuroAtivo) {
        document.body.classList.add('dark');
        botaoModoEscuro.innerHTML = '☀️';
    }

    // Adiciona evento para alternar modo escuro
    botaoModoEscuro.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const estaEscuro = document.body.classList.contains('dark');
        localStorage.setItem('modoEscuro', estaEscuro);
        botaoModoEscuro.innerHTML = estaEscuro ? '☀️' : '🌙';
    });
}

// Carrega dados do localStorage
function carregarDoLocalStorage() {
    const quartosGravados = localStorage.getItem('hotelQuartos');
    if (quartosGravados) {
        quartos = JSON.parse(quartosGravados);
    }
}

// Exibe os quartos na página
function exibirQuartos() {
    const gridQuartos = document.getElementById('roomsGrid');
    gridQuartos.innerHTML = quartos.map(quarto => `
        <div class="room-card">
            <img src="${quarto.imagem}" alt="${quarto.nome}">
            <div class="room-info">
                <h3>${quarto.nome}</h3>
                <p>${quarto.descricao}</p>
                <p class="price">R$ ${quarto.preco}/noite</p>
            </div>
        </div>
    `).join('');

    // Preenche o select de quartos no formulário de reserva
    const selecionarQuarto = document.getElementById('roomType');
    selecionarQuarto.innerHTML = '<option value="">Selecione um quarto</option>' +
        quartos.map(quarto => `
            <option value="${quarto.id}">${quarto.nome} - R$ ${quarto.preco}/noite</option>
        `).join('');
}

// Exibe os serviços na página
function exibirServicos() {
    const gridServicos = document.getElementById('servicesGrid');
    gridServicos.innerHTML = servicos.map(servico => `
        <div class="service-card">
            <div class="service-icon">${servico.icone}</div>
            <h3>${servico.nome}</h3>
            <p>${servico.descricao}</p>
        </div>
    `).join('');
}

// Processa o formulário de reserva
function processarReserva(e) {
    e.preventDefault();
    const dataEntrada = document.getElementById('checkIn').value;
    const dataSaida = document.getElementById('checkOut').value;
    const tipoQuarto = document.getElementById('roomType').value;
    const numHospedes = document.getElementById('guests').value;
    const nome = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const telefone = document.getElementById('guestPhone').value;

    // Valida as datas
    if (new Date(dataEntrada) >= new Date(dataSaida)) {
        alert('A data de saída deve ser posterior à data de entrada.');
        return;
    }

    // Cria objeto de reserva
    const reserva = {
        id: Date.now(),
        dataEntrada,
        dataSaida,
        quartoId: parseInt(tipoQuarto),
        nomeQuarto: quartos.find(q => q.id === parseInt(tipoQuarto)).nome,
        numHospedes: parseInt(numHospedes),
        nomeHospede: nome,
        emailHospede: email,
        telefoneHospede: telefone,
        status: 'pendente',
        dataCriacao: new Date().toISOString()
    };

    // Salva a reserva no localStorage
    const reservas = JSON.parse(localStorage.getItem('hotelReservas') || '[]');
    reservas.push(reserva);
    localStorage.setItem('hotelReservas', JSON.stringify(reservas));

    alert('Reserva realizada com sucesso! Em breve entraremos em contato.');
    e.target.reset();
}

// Configura rolagem suave
function configurarRolagemSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDoLocalStorage();
    exibirQuartos();
    exibirServicos();
    configurarMenuMobile();
    configurarModoEscuro();
    configurarRolagemSuave();
    
    document.getElementById('bookingForm').addEventListener('submit', processarReserva);

    // Define data mínima para check-in e check-out
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = hoje;
    document.getElementById('checkOut').min = hoje;
});