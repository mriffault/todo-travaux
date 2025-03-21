// app.js - Application principale

// Initialiser l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', async () => {
    // Références aux éléments du DOM
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    
    // Charger les tâches depuis l'API
    try {
        await taskManager.loadTasks();
    } catch (error) {
        console.error('Erreur lors du chargement initial:', error);
        showError('Impossible de charger les tâches. Veuillez réessayer plus tard.');
    }
    
    // Événement pour ajouter une nouvelle tâche
    addTaskBtn.addEventListener('click', async () => {
        const title = taskInput.value.trim();
        if (title) {
            try {
                await taskManager.createTask(title);
                taskInput.value = '';
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la tâche:', error);
                showError('Impossible d\'ajouter la tâche. Veuillez réessayer.');
            }
        }
    });
    
    // Ajouter une tâche en appuyant sur Entrée
    taskInput.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
            const title = taskInput.value.trim();
            if (title) {
                try {
                    await taskManager.createTask(title);
                    taskInput.value = '';
                } catch (error) {
                    console.error('Erreur lors de l\'ajout de la tâche:', error);
                    showError('Impossible d\'ajouter la tâche. Veuillez réessayer.');
                }
            }
        }
    });
    
    // Fonction pour afficher un message d'erreur
    function showError(message) {
        // Créer un élément de notification d'erreur
        const errorNotif = document.createElement('div');
        errorNotif.className = 'error-notification';
        errorNotif.textContent = message;
        
        // Ajouter au DOM
        document.body.appendChild(errorNotif);
        
        // Supprimer après quelques secondes
        setTimeout(() => {
            errorNotif.classList.add('fade-out');
            
            // Supprimer du DOM après la fin de l'animation
            setTimeout(() => {
                document.body.removeChild(errorNotif);
            }, 300);
        }, 3000);
    }
});

// Créer les instances globales des modules
const api = new API();