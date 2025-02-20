// Credenciais de administrador mockadas (em uma aplicação real, isso seria tratado no servidor)
const CREDENCIAIS_ADMIN = {
    usuario: 'admin',
    senha: 'admin123'
};

// Dados mockados para reservas iniciais
const RESERVAS_MOCK = [
    {
        id: 1,
        dataEntrada: '2024-03-20',
        dataSaida: '2024-03-25',
        quartoId: 1,
        nomeQuarto: 'Quarto Standard',
        numHospedes: 2,
        nomeHospede: 'João Silva',
        emailHospede: 'joao.silva@email.com',
        telefoneHospede: '(11) 98765-4321',
        status: 'confirmada',
        dataCriacao: '2024-03-15T10:30:00.000Z'
    },
    {
        id: 2,
        dataEntrada: '2024-03-22',
        dataSaida: '2024-03-24',
        quartoId: 2,
        nomeQuarto: 'Quarto Luxo',
        numHospedes: 2,
        nomeHospede: 'Maria Santos',
        emailHospede: 'maria.santos@email.com',
        telefoneHospede: '(11) 98888-7777',
        status: 'pendente',
        dataCriacao: '2024-03-16T14:20:00.000Z'
    },
    {
        id: 3,
        dataEntrada: '2024-03-25',
        dataSaida: '2024-03-30',
        quartoId: 3,
        nomeQuarto: 'Suíte Presidencial',
        numHospedes: 3,
        nomeHospede: 'Carlos Oliveira',
        emailHospede: 'carlos.oliveira@email.com',
        telefoneHospede: '(11) 97777-6666',
        status: 'pendente',
        dataCriacao: '2024-03-17T09:15:00.000Z'
    },
    {
        id: 4,
        dataEntrada: '2024-03-18',
        dataSaida: '2024-03-19',
        quartoId: 1,
        nomeQuarto: 'Quarto Standard',
        numHospedes: 1,
        nomeHospede: 'Ana Pereira',
        emailHospede: 'ana.pereira@email.com',
        telefoneHospede: '(11) 96666-5555',
        status: 'cancelada',
        dataCriacao: '2024-03-15T16:40:00.000Z'
    },
    {
        id: 5,
        dataEntrada: '2024-03-28',
        dataSaida: '2024-04-02',
        quartoId: 2,
        nomeQuarto: 'Quarto Luxo',
        numHospedes: 2,
        nomeHospede: 'Roberto Costa',
        emailHospede: 'roberto.costa@email.com',
        telefoneHospede: '(11) 95555-4444',
        status: 'confirmada',
        dataCriacao: '2024-03-18T11:25:00.000Z'
    }
];

// Gerenciamento de estado
let anuncios = [];
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

// Tratamento de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    if (usuario === CREDENCIAIS_ADMIN.usuario && senha === CREDENCIAIS_ADMIN.senha) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        carregarPainelAdmin();
    } else {
        alert('Credenciais inválidas!');
    }
});

// Tratamento de logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('loginForm').reset();
});

// Gerenciamento de reservas
function carregarReservas() {
    let reservas = JSON.parse(localStorage.getItem('hotelReservas') || '[]');
    
    // Se não houver reservas, usa dados mockados
    if (reservas.length === 0) {
        reservas = RESERVAS_MOCK;
        localStorage.setItem('hotelReservas', JSON.stringify(RESERVAS_MOCK));
    }

    const filtroStatus = document.getElementById('statusFilter').value;
    const reservasFiltradas = filtroStatus === 'all' 
        ? reservas 
        : reservas.filter(reserva => reserva.status === filtroStatus);

    const listaReservas = document.getElementById('bookingList');
    listaReservas.innerHTML = reservasFiltradas.map(reserva => `
        <div class="booking-card">
            <h3>Reserva #${reserva.id}</h3>
            <div class="booking-details">
                <div>
                    <strong>Hóspede:</strong> ${reserva.nomeHospede}<br>
                    <strong>E-mail:</strong> ${reserva.emailHospede}<br>
                    <strong>Telefone:</strong> ${reserva.telefoneHospede}
                </div>
                <div>
                    <strong>Quarto:</strong> ${reserva.nomeQuarto}<br>
                    <strong>Check-in:</strong> ${new Date(reserva.dataEntrada).toLocaleDateString()}<br>
                    <strong>Check-out:</strong> ${new Date(reserva.dataSaida).toLocaleDateString()}<br>
                    <strong>Hóspedes:</strong> ${reserva.numHospedes}
                </div>
                <div>
                    <strong>Status:</strong> 
                    <span class="booking-status status-${reserva.status}">
                        ${reserva.status.toUpperCase()}
                    </span>
                </div>
            </div>
            <div class="booking-actions">
                ${reserva.status === 'pendente' ? `
                    <button onclick="atualizarStatusReserva(${reserva.id}, 'confirmada')" style="background-color: var(--success)">
                        Confirmar
                    </button>
                    <button onclick="atualizarStatusReserva(${reserva.id}, 'cancelada')" style="background-color: var(--danger)">
                        Cancelar
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function atualizarStatusReserva(reservaId, novoStatus) {
    const reservas = JSON.parse(localStorage.getItem('hotelReservas') || '[]');
    const reservasAtualizadas = reservas.map(reserva => 
        reserva.id === reservaId 
            ? { ...reserva, status: novoStatus }
            : reserva
    );
    localStorage.setItem('hotelReservas', JSON.stringify(reservasAtualizadas));
    carregarReservas();
}

// Gerenciamento de quartos
function carregarQuartos() {
    const listaQuartos = document.getElementById('roomList');
    listaQuartos.innerHTML = quartos.map(quarto => `
        <div class="room-card">
            <img src="${quarto.imagem}" alt="${quarto.nome}">
            <div class="room-info">
                <h3>${quarto.nome}</h3>
                <p>${quarto.descricao}</p>
                <p>R$ ${quarto.preco}/noite</p>
                <div class="room-actions">
                    <button onclick="atualizarImagemQuarto(${quarto.id})">Alterar Imagem</button>
                    <button onclick="editarDetalhesQuarto(${quarto.id})">Editar Detalhes</button>
                </div>
            </div>
        </div>
    `).join('');
}

function atualizarImagemQuarto(quartoId) {
    const urlImagem = prompt('Insira a URL da nova imagem:');
    if (urlImagem) {
        const quarto = quartos.find(q => q.id === quartoId);
        if (quarto) {
            quarto.imagem = urlImagem;
            carregarQuartos();
            salvarNoLocalStorage();
        }
    }
}

function editarDetalhesQuarto(quartoId) {
    const quarto = quartos.find(q => q.id === quartoId);
    if (quarto) {
        const nome = prompt('Nome do quarto:', quarto.nome);
        const descricao = prompt('Descrição do quarto:', quarto.descricao);
        const preco = prompt('Preço por noite:', quarto.preco);

        if (nome && descricao && preco) {
            quarto.nome = nome;
            quarto.descricao = descricao;
            quarto.preco = parseFloat(preco);
            carregarQuartos();
            salvarNoLocalStorage();
        }
    }
}

// Gerenciamento de anúncios
document.getElementById('announcementForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const titulo = document.getElementById('announcementTitle').value;
    const conteudo = document.getElementById('announcementContent').value;

    anuncios.push({
        id: Date.now(),
        titulo,
        conteudo,
        data: new Date().toLocaleDateString()
    });

    carregarAnuncios();
    this.reset();
    salvarNoLocalStorage();
});

function carregarAnuncios() {
    const listaAnuncios = document.getElementById('announcementList');
    listaAnuncios.innerHTML = anuncios.map(anuncio => `
        <div class="announcement-item">
            <h3>${anuncio.titulo}</h3>
            <p>${anuncio.conteudo}</p>
            <small>${anuncio.data}</small>
            <button onclick="excluirAnuncio(${anuncio.id})">Excluir</button>
        </div>
    `).join('');
}

function excluirAnuncio(id) {
    if (confirm('Tem certeza que deseja excluir este anúncio?')) {
        anuncios = anuncios.filter(a => a.id !== id);
        carregarAnuncios();
        salvarNoLocalStorage();
    }
}

// Tratamento do filtro de status
document.getElementById('statusFilter').addEventListener('change', carregarReservas);

// Gerenciamento do LocalStorage
function salvarNoLocalStorage() {
    localStorage.setItem('hotelQuartos', JSON.stringify(quartos));
    localStorage.setItem('hotelAnuncios', JSON.stringify(anuncios));
}

function carregarDoLocalStorage() {
    const quartosGravados = localStorage.getItem('hotelQuartos');
    const anunciosGravados = localStorage.getItem('hotelAnuncios');

    if (quartosGravados) {
        quartos = JSON.parse(quartosGravados);
    }
    if (anunciosGravados) {
        anuncios = JSON.parse(anunciosGravados);
    }
}

// Inicializa o painel admin
function carregarPainelAdmin() {
    carregarDoLocalStorage();
    carregarQuartos();
    carregarAnuncios();
    carregarReservas();
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Se o usuário já estiver logado (painel admin visível), carrega o painel
    if (document.getElementById('adminPanel').style.display === 'block') {
        carregarPainelAdmin();
    }
});