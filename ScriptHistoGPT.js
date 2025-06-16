// ChatGPT Histórico - Gerenciador de Conversas
// Script para o console do DevTools do Google Chrome
// Versão modernizada com UI aprimorada

(async function() {
    // Estilo CSS modernizado
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color: #10b981;
            --primary-hover: #059669;
            --danger-color: #ef4444;
            --danger-hover: #dc2626;
            --bg-color: #1f2937;
            --container-bg: #111827;
            --card-bg: #1e293b;
            --highlight-bg: #2d3748;
            --text-light: #f3f4f6;
            --text-muted: #9ca3af;
            --border-color: #374151;
            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --radius-sm: 0.375rem;
            --radius-md: 0.5rem;
            --radius-lg: 0.75rem;
            --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            --transition: all 0.2s ease;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .history-manager {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(5px);
            z-index: 9999;
            color: var(--text-light);
            font-family: var(--font-sans);
            overflow-y: auto;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .history-container {
			width: 100%;
			max-width: 882px;
			margin: -3px auto;
			background-color: var(--container-bg);
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-lg);
			padding: 0px;
			animation: fadeIn 0.3s ease;
			height: 87%;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 16px;
        }
        
        .history-title {
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        
        .history-title::before {
            content: "";
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 10px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: contain;
        }
        
        .close-btn {
            background-color: transparent;
            color: var(--text-light);
            border: none;
            border-radius: var(--radius-sm);
            width: 36px;
            height: 36px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }
        
        .close-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .close-btn::before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f3f4f6'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: contain;
        }
        
        .controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 16px;
        }
        
        .control-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            border: none;
            border-radius: var(--radius-md);
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
            height: 38px;
            gap: 6px;
            white-space: nowrap;
            box-shadow: var(--shadow-sm);
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            color: white;
        }
        
        .btn-primary:hover {
            background-color: var(--primary-hover);
        }
        
        .btn-outline {
            background-color: transparent;
            color: var(--text-light);
            border: 1px solid var(--border-color);
        }
        
        .btn-outline:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        .btn-danger {
            background-color: var(--danger-color);
            color: white;
        }
        
        .btn-danger:hover {
            background-color: var(--danger-hover);
        }
        
        .search-container {
            position: relative;
            flex-grow: 1;
            max-width: 300px;
        }
        
        .search-box {
            padding: 8px 12px 8px 38px;
            border-radius: var(--radius-md);
            border: 1px solid var(--border-color);
            background-color: rgba(255, 255, 255, 0.05);
            color: white;
            width: 100%;
            height: 38px;
            transition: var(--transition);
        }
        
        .search-box:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
        }
        
        .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            pointer-events: none;
        }
        
        .search-icon::before {
            content: "";
            display: block;
            width: 16px;
            height: 16px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: contain;
        }
        
        .conversation-list {
            background-color: var(--card-bg);
            border-radius: var(--radius-md);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
        }
        
        .empty-state {
            padding: 40px 20px;
            text-align: center;
            color: var(--text-muted);
        }
        
        .empty-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 16px;
            opacity: 0.6;
        }
        
        .empty-icon svg {
            width: 100%;
            height: 100%;
        }
        
        .loading {
            padding: 40px 20px;
            text-align: center;
            color: var(--text-muted);
        }
        
        .conversation-item {
            display: flex;
            align-items: center;
            padding: 14px 16px;
            border-bottom: 1px solid var(--border-color);
            transition: var(--transition);
        }
        
        .conversation-item:last-child {
            border-bottom: none;
        }
        
        .conversation-item:hover {
            background-color: var(--highlight-bg);
        }
        
        .conversation-checkbox {
            margin-right: 16px;
            width: 18px;
            height: 18px;
            accent-color: var(--primary-color);
            cursor: pointer;
        }
        
        .conversation-content {
            flex-grow: 1;
            min-width: 0; /* Para evitar overflow */
        }
        
        .conversation-title {
            font-weight: 500;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
        }
        
        .conversation-date {
            color: var(--text-muted);
            font-size: 0.75rem;
        }
        
        .conversation-actions {
            display: flex;
            align-items: center;
            margin-left: 12px;
        }
        
        .details-btn {
            background-color: transparent;
            color: var(--text-muted);
            border: none;
            border-radius: var(--radius-sm);
            padding: 6px 12px;
            font-size: 0.75rem;
            cursor: pointer;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
        }
        
        .details-btn:hover {
            color: var(--text-light);
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        .details-btn::after {
            content: "";
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-left: 4px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: contain;
            transition: var(--transition);
        }
        
        .expanded .details-btn::after {
            transform: rotate(180deg);
        }
        
        .conversation-details {
            display: none;
            margin: 0 0 0 48px;
            padding: 16px;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: var(--radius-sm);
            white-space: pre-wrap;
            max-height: 300px;
            overflow-y: auto;
            font-size: 0.875rem;    
            line-height: 1.5;
            border-left: 2px solid var(--primary-color);
        }
        
        .expanded .conversation-details {
            display: block;
            animation: slideDown 0.2s ease;
        }
        
        @keyframes slideDown {
            from { max-height: 0; opacity: 0; }
            to { max-height: 300px; opacity: 1; }
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, .2);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .status {
            margin-top: 12px;
            margin-bottom: 12px;
            padding: 12px 16px;
            border-radius: var(--radius-md);
            font-weight: 500;
            animation: fadeIn 0.3s ease;
        }
        
        .status.success {
            background-color: rgba(16, 185, 129, 0.2);
            color: #34d399;
            border-left: 4px solid var(--primary-color);
        }
        
        .status.error {
            background-color: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border-left: 4px solid var(--danger-color);
        }
        
        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 24px;
            gap: 12px;
        }
        
        .pagination button {
            background-color: var(--card-bg);
            color: var(--text-light);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 8px 16px;
            cursor: pointer;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            font-size: 0.875rem;
            box-shadow: var(--shadow-sm);
        }
        
        .pagination button:hover:not(:disabled) {
            background-color: var(--highlight-bg);
        }
        
        .pagination button:disabled {
            background-color: rgba(255, 255, 255, 0.05);
            color: var(--text-muted);
            cursor: not-allowed;
            opacity: 0.6;
        }
        
        .page-info {
            color: var(--text-muted);
            font-size: 0.875rem;
        }
        
        .prev-btn::before, .next-btn::after {
            content: "";
            display: inline-block;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-size: contain;
        }
        
        .prev-btn::before {
            margin-right: 8px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f3f4f6'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3C/svg%3E");
        }
        
        .next-btn::after {
            margin-left: 8px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f3f4f6'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E");
        }
        
        /* Message styling */
        .message {
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        }
        
        .message:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .message-header {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            font-size: 0.75rem;
            color: var(--text-muted);
        }
        
        .message-author {
            font-weight: 600;
            margin-right: 8px;
        }
        
        .message-author.user {
            color: #60a5fa;
        }
        
        .message-author.assistant {
            color: var(--primary-color);
        }
        
        .message-content {
            white-space: pre-wrap;
            overflow-wrap: break-word;
        }
        
        /* Tooltip styling */
        [data-tooltip] {
            position: relative;
        }
        
        [data-tooltip]:hover::before {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 6px 10px;
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
            white-space: nowrap;
            z-index: 10;
            pointer-events: none;
            margin-bottom: 5px;
        }
    `;
    document.head.appendChild(style);

    // Criar a interface do gerenciador de histórico
    const managerDiv = document.createElement('div');
    managerDiv.className = 'history-manager';
    managerDiv.innerHTML = `
        <div class="history-container">
            <div class="history-header">
                <div class="history-title">Gerenciador de Histórico ChatGPT</div>
                <button class="close-btn" aria-label="Fechar"></button>
            </div>
            
            <div class="controls">
                <div class="control-buttons">
                    <button id="select-all" class="btn btn-outline" data-tooltip="Selecionar todos">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                        </svg>
                        Selecionar Todos
                    </button>
                    <button id="deselect-all" class="btn btn-outline" data-tooltip="Desmarcar todos">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 17H17V7H7V17Z" fill="currentColor"/>
                        </svg>
                        Desmarcar Todos
                    </button>
                    <button id="delete-selected" class="btn btn-danger" data-tooltip="Excluir selecionados">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                        Excluir Selecionados
                    </button>
                </div>
                <div class="search-container">
                    <span class="search-icon"></span>
                    <input type="text" class="search-box" placeholder="Buscar conversas...">
                </div>
            </div>
            
            <div id="status"></div>
            
            <div class="conversation-list" id="conversation-list">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Carregando conversas...</p>
                </div>
            </div>
            
            <div class="pagination">
                <button id="prev-page" class="prev-btn" disabled>Anterior</button>
                <span id="page-info" class="page-info">Página 1</span>
                <button id="next-page" class="next-btn">Próximo</button>
            </div>
        </div>
    `;
    document.body.appendChild(managerDiv);

    // Variáveis de estado
    let conversations = [];
    let filteredConversations = [];
    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = 1;

    // Função para obter o token de autorização da requisição atual
    function getAuthToken() {
        // Tentativa de extrair o token de várias fontes possíveis
        let token = '';
        
        // Verificar localStorage
        const localStorageKeys = Object.keys(localStorage);
        for (const key of localStorageKeys) {
            if (key.includes('token') || key.includes('Token') || key.includes('auth')) {
                try {
                    const value = localStorage.getItem(key);
                    if (value && value.includes('eyJ')) {
                        token = value.replace(/"/g, '');
                        if (token.startsWith('Bearer ')) {
                            return token;
                        } else {
                            return `Bearer ${token}`;
                        }
                    }
                } catch (e) {}
            }
        }
        
        // Verificar cookies
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            if (cookie.includes('token') || cookie.includes('Token') || cookie.includes('auth')) {
                const value = cookie.split('=')[1];
                if (value && value.includes('eyJ')) {
                    return `Bearer ${value}`;
                }
            }
        }
        
        // Se não conseguir encontrar automaticamente, solicitar ao usuário
        token = prompt('Não foi possível obter o token de autorização automaticamente. Por favor, insira seu token de acesso (geralmente começa com "eyJ"):');
        
        if (token) {
            return `Bearer ${token}`;
        } else {
            showStatus('Não foi possível obter o token de autorização. O gerenciador pode não funcionar corretamente.', 'error');
            return '';
        }
    }

    // Token de autorização
    const authToken = getAuthToken();

    // Função para formatar data
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const options = { 
            hour: '2-digit', 
            minute: '2-digit'
        };
        
        // Se for hoje, mostrar apenas a hora
        if (date.toDateString() === now.toDateString()) {
            return `Hoje às ${date.toLocaleTimeString([], options)}`;
        }
        
        // Se for ontem
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return `Ontem às ${date.toLocaleTimeString([], options)}`;
        }
        
        // Se for nos últimos 7 dias
        if (diffDays < 7) {
            const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
            return `${weekdays[date.getDay()]} às ${date.toLocaleTimeString([], options)}`;
        }
        
        // Caso contrário, mostrar data completa
        return `${date.toLocaleDateString()} às ${date.toLocaleTimeString([], options)}`;
    }

    // Função para mostrar mensagens de status
    function showStatus(message, type = 'success') {
        const statusDiv = document.getElementById('status');
        statusDiv.className = `status ${type}`;
        statusDiv.textContent = message;
        
        // Limpar o status após alguns segundos
        setTimeout(() => {
            statusDiv.className = '';
            statusDiv.textContent = '';
        }, 5000);
    }

    // Função para obter conversas
     // Função para obter conversas
    async function fetchConversations() {
        try {
            const response = await fetch('https://chatgpt.com/backend-api/conversations?offset=0&limit=100&order=updated', {
                method: 'GET',
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Erro ao obter conversas: ${response.status}`);
            }
            
            const data = await response.json();
            conversations = data.items || [];
            filteredConversations = [...conversations];
            totalPages = Math.ceil(filteredConversations.length / itemsPerPage);
            
            renderConversations();
        } catch (error) {
            console.error('Erro ao obter conversas:', error);
            showStatus(`Erro ao carregar conversas: ${error.message}`, 'error');
            document.getElementById('conversation-list').innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p>Falha ao carregar conversas. ${error.message}</p>
                </div>
            `;
        }
    }

    // Função para obter detalhes de uma conversa
    async function fetchConversationDetails(conversationId) {
        try {
            const response = await fetch(`https://chatgpt.com/backend-api/conversation/${conversationId}`, {
                method: 'GET',
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Erro ao obter detalhes: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Erro ao obter detalhes da conversa ${conversationId}:`, error);
            return null;
        }
    }

    // Função para excluir conversa
    async function deleteConversation(conversationId) {
        try {
            const response = await fetch(`https://chatgpt.com/backend-api/conversation/${conversationId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_visible: false })
            });
            
            if (!response.ok) {
                throw new Error(`Erro ao excluir conversa: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error(`Erro ao excluir conversa ${conversationId}:`, error);
            return false;
        }
    }

    // Formatar o conteúdo da conversa em mensagens
    function formatConversationContent(details) {
        if (!details || !details.mapping) {
            return 'Não foi possível extrair o conteúdo desta conversa.';
        }
        
        // Ordenar nós pela ordem de criação
        const nodes = Object.values(details.mapping);
        nodes.sort((a, b) => {
            // Tenta ordenar pela criação ou ordem no objeto
            const aTime = a.message?.create_time || 0;
            const bTime = b.message?.create_time || 0;
            return aTime - bTime;
        });
        
        let html = '';
        for (const node of nodes) {
            if (node.message && node.message.content && node.message.content.parts) {
                const isAssistant = node.message.author.role === 'assistant';
                const author = isAssistant ? 'ChatGPT' : 'Você';
                const authorClass = isAssistant ? 'assistant' : 'user';
                const content = node.message.content.parts.join('\n');
                
                if (content.trim()) {
                    html += `
                        <div class="message">
                            <div class="message-header">
                                <span class="message-author ${authorClass}">${author}</span>
                            </div>
                            <div class="message-content">${content}</div>
                        </div>
                    `;
                }
            }
        }
        
        return html || 'Não foi possível extrair o conteúdo desta conversa.';
    }

    // Função para renderizar a lista de conversas
    function renderConversations() {
        const listDiv = document.getElementById('conversation-list');
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentConversations = filteredConversations.slice(startIndex, endIndex);
        
        if (currentConversations.length === 0) {
            listDiv.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" fill="currentColor"/>
                        </svg>
                    </div>
                    <p>Nenhuma conversa encontrada.</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        currentConversations.forEach(conversation => {
            const title = conversation.title || 'Conversa sem título';
            const date = formatDate(conversation.update_time);
            
            html += `
                <div class="conversation-item" data-id="${conversation.id}">
                    <input type="checkbox" class="conversation-checkbox" data-id="${conversation.id}">
                    <div class="conversation-content">
                        <div class="conversation-title">${title}</div>
                        <div class="conversation-date">${date}</div>
                    </div>
                    <div class="conversation-actions">
                        <button class="details-btn">Detalhes</button>
                    </div>
                    <div class="conversation-details"></div>
                </div>
            `;
        });
        
        listDiv.innerHTML = html;
        
        // Atualizar informações de paginação
        document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPages || 1}`;
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;
        
        // Adicionar event listeners para os botões de detalhes
        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', async function() {
                const item = this.closest('.conversation-item');
                const conversationId = item.dataset.id;
                const detailsDiv = item.querySelector('.conversation-details');
                
                if (item.classList.contains('expanded')) {
                    item.classList.remove('expanded');
                    this.textContent = 'Detalhes';
                } else {
                    // Fechar outros detalhes abertos
                    document.querySelectorAll('.conversation-item.expanded').forEach(expandedItem => {
                        if (expandedItem !== item) {
                            expandedItem.classList.remove('expanded');
                            expandedItem.querySelector('.details-btn').textContent = 'Detalhes';
                        }
                    });
                    
                    item.classList.add('expanded');
                    this.textContent = 'Ocultar';
                    
                    // Mostrar indicador de carregamento
                    detailsDiv.innerHTML = `
                        <div style="text-align: center; padding: 10px;">
                            <div class="spinner"></div>
                            <p>Carregando detalhes...</p>
                        </div>
                    `;
                    
                    const details = await fetchConversationDetails(conversationId);
                    if (details) {
                        detailsDiv.innerHTML = formatConversationContent(details);
                    } else {
                        detailsDiv.innerHTML = `
                            <div style="text-align: center; padding: 10px; color: var(--danger-color);">
                                <p>Erro ao carregar detalhes.</p>
                            </div>
                        `;
                    }
                }
            });
        });
        
        // Adicionar event listeners para os títulos
        document.querySelectorAll('.conversation-title').forEach(title => {
            title.addEventListener('click', function() {
                const item = this.closest('.conversation-item');
                item.querySelector('.details-btn').click();
            });
        });
    }
	
	// Continuação do código após a função renderConversations()

    // Event listeners para paginação
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderConversations();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderConversations();
        }
    });
    
    // Event listener para pesquisa
    document.querySelector('.search-box').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredConversations = [...conversations];
        } else {
            filteredConversations = conversations.filter(conversation => 
                (conversation.title || 'Conversa sem título').toLowerCase().includes(searchTerm)
            );
        }
        
        currentPage = 1;
        totalPages = Math.ceil(filteredConversations.length / itemsPerPage);
        renderConversations();
    });
    
    // Event listeners para seleção
    document.getElementById('select-all').addEventListener('click', function() {
        document.querySelectorAll('.conversation-checkbox').forEach(checkbox => {
            checkbox.checked = true;
        });
    });
    
    document.getElementById('deselect-all').addEventListener('click', function() {
        document.querySelectorAll('.conversation-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
    });
    
    // Event listener para exclusão de conversas selecionadas
    document.getElementById('delete-selected').addEventListener('click', async function() {
        const checkboxes = document.querySelectorAll('.conversation-checkbox:checked');
        
        if (checkboxes.length === 0) {
            showStatus('Nenhuma conversa selecionada', 'error');
            return;
        }
        
        const confirmDelete = confirm(`Você tem certeza que deseja excluir ${checkboxes.length} conversas?`);
        if (!confirmDelete) return;
        
        // Desativar o botão durante o processo
        this.disabled = true;
        this.innerHTML = '<div class="spinner"></div> Excluindo...';
        
        let successCount = 0;
        let failCount = 0;
        
        for (const checkbox of checkboxes) {
            const conversationId = checkbox.dataset.id;
            const success = await deleteConversation(conversationId);
            
            if (success) {
                successCount++;
            } else {
                failCount++;
            }
        }
        
        // Reativar o botão
        this.disabled = false;
        this.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
            </svg>
            Excluir Selecionados
        `;
        
        if (successCount > 0) {
            // Atualizar a lista de conversas após exclusão
            await fetchConversations();
            
            if (failCount > 0) {
                showStatus(`${successCount} conversas excluídas com sucesso, ${failCount} falhas.`, 'success');
            } else {
                showStatus(`${successCount} conversas excluídas com sucesso!`, 'success');
            }
        } else {
            showStatus(`Falha ao excluir conversas`, 'error');
        }
    });
    
    // Event listener para fechar o gerenciador
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.querySelector('.history-manager').remove();
    });
    
    // Função para exportar conversa selecionada
    async function exportConversation(conversationId) {
        try {
            const details = await fetchConversationDetails(conversationId);
            if (!details) {
                throw new Error('Não foi possível obter detalhes da conversa');
            }
            
            // Encontrar o título da conversa
            const conversation = conversations.find(c => c.id === conversationId);
            const title = conversation ? (conversation.title || 'Conversa sem título') : 'Conversa exportada';
            
            // Formatar o conteúdo para exportação (texto simples)
            const nodes = Object.values(details.mapping);
            nodes.sort((a, b) => {
                const aTime = a.message?.create_time || 0;
                const bTime = b.message?.create_time || 0;
                return aTime - bTime;
            });
            
            let textContent = `# ${title}\n\n`;
            for (const node of nodes) {
                if (node.message && node.message.content && node.message.content.parts) {
                    const isAssistant = node.message.author.role === 'assistant';
                    const author = isAssistant ? 'ChatGPT' : 'Você';
                    const content = node.message.content.parts.join('\n');
                    
                    if (content.trim()) {
                        textContent += `## ${author}\n\n${content}\n\n`;
                    }
                }
            }
            
            // Criar e baixar o arquivo
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return true;
        } catch (error) {
            console.error(`Erro ao exportar conversa ${conversationId}:`, error);
            return false;
        }
    }
    
    // Adicionar botão de exportar na inicialização
    function addExportButton() {
        const controlButtons = document.querySelector('.control-buttons');
        const exportButton = document.createElement('button');
        exportButton.id = 'export-selected';
        exportButton.className = 'btn btn-outline';
        exportButton.dataset.tooltip = 'Exportar selecionados';
        exportButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
            </svg>
            Exportar Selecionados
        `;
        
        controlButtons.appendChild(exportButton);
        
        // Event listener para exportar conversas selecionadas
        exportButton.addEventListener('click', async function() {
            const checkboxes = document.querySelectorAll('.conversation-checkbox:checked');
            
            if (checkboxes.length === 0) {
                showStatus('Nenhuma conversa selecionada', 'error');
                return;
            }
            
            // Desativar o botão durante o processo
            this.disabled = true;
            this.innerHTML = '<div class="spinner"></div> Exportando...';
            
            let successCount = 0;
            let failCount = 0;
            
            for (const checkbox of checkboxes) {
                const conversationId = checkbox.dataset.id;
                const success = await exportConversation(conversationId);
                
                if (success) {
                    successCount++;
                } else {
                    failCount++;
                }
            }
            
            // Reativar o botão
            this.disabled = false;
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
                </svg>
                Exportar Selecionados
            `;
            
            if (successCount > 0) {
                if (failCount > 0) {
                    showStatus(`${successCount} conversas exportadas com sucesso, ${failCount} falhas.`, 'success');
                } else {
                    showStatus(`${successCount} conversas exportadas com sucesso!`, 'success');
                }
            } else {
                showStatus(`Falha ao exportar conversas`, 'error');
            }
        });
    }
    
    // Inicializar a interface
    async function init() {
        try {
            addExportButton();
            await fetchConversations();
        } catch (error) {
            console.error('Erro ao inicializar:', error);
            showStatus(`Erro ao inicializar: ${error.message}`, 'error');
        }
    }
    
    // Iniciar
    init();
})();