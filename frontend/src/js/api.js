// api.js - Module pour les appels à l'API

class API {
    constructor() {
        this.baseUrl = '/api';
        this.tasksEndpoint = `${this.baseUrl}/tasks`;
    }

    // Récupérer toutes les tâches
    async getTasks() {
        try {
            const headers = await auth.getAuthHeaders();
            const response = await fetch(this.tasksEndpoint, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des tâches: ${response.status}`);
            }

            const data = await response.json();
            return data['hydra:member']; // Format API Platform
        } catch (error) {
            console.error('Erreur API:', error);
            throw error;
        }
    }

    // Créer une nouvelle tâche
    async createTask(title) {
        try {
            const headers = await auth.getAuthHeaders();
            const response = await fetch(this.tasksEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    title,
                    completed: false,
                    position: 1000 // valeur par défaut, sera ajustée
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la création de la tâche: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erreur API:', error);
            throw error;
        }
    }

    // Mettre à jour une tâche
    async updateTask(id, taskData) {
        try {
            const headers = await auth.getAuthHeaders();
            const response = await fetch(`${this.tasksEndpoint}/${id}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la mise à jour de la tâche: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erreur API:', error);
            throw error;
        }
    }

    // Supprimer une tâche
    async deleteTask(id) {
        try {
            const headers = await auth.getAuthHeaders();
            const response = await fetch(`${this.tasksEndpoint}/${id}`, {
                method: 'DELETE',
                headers
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression de la tâche: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Erreur API:', error);
            throw error;
        }
    }
    
    // Réordonner les tâches
    async updateTaskPositions(taskPositions) {
        const promises = taskPositions.map(({ id, position }) => {
            return this.updateTask(id, { position });
        });
        
        return Promise.all(promises);
    }
}