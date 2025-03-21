// auth.js - Module d'authentification OAuth2 Client Credentials

class Auth {
    constructor() {
        this.token = null;
        this.clientId = 'todo_app_client';
        this.clientSecret = 'secret'; // Dans une app réelle, à sécuriser davantage
        this.tokenEndpoint = '/api/token';
        this.tokenExpiry = null;
    }

    // Vérifier si le token est encore valide
    isAuthenticated() {
        return this.token !== null && this.tokenExpiry > new Date();
    }

    // Obtenir un token valide (récupère un nouveau si nécessaire)
    async getToken() {
        if (this.isAuthenticated()) {
            return this.token;
        }
        
        return this.authenticate();
    }

    // Authentifier l'application avec le flux Client Credentials
    async authenticate() {
        try {
            const formData = new URLSearchParams();
            formData.append('grant_type', 'client_credentials');
            formData.append('client_id', this.clientId);
            formData.append('client_secret', this.clientSecret);
            formData.append('scope', 'task:read task:write');

            const response = await fetch(this.tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Erreur d'authentification: ${response.status}`);
            }

            const data = await response.json();
            this.token = data.access_token;
            
            // Calculer l'expiration du token
            const expiresIn = data.expires_in || 3600; // par défaut 1 heure
            this.tokenExpiry = new Date(Date.now() + expiresIn * 1000);
            
            return this.token;
        } catch (error) {
            console.error('Erreur lors de l\'authentification:', error);
            this.token = null;
            this.tokenExpiry = null;
            throw error;
        }
    }

    // Ajouter le token d'authentification aux en-têtes de requête
    async getAuthHeaders() {
        const token = await this.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }
}

// Exporter une instance unique d'Auth
const auth = new Auth();