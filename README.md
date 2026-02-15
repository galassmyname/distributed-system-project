# Projet Système Réparti - Application Web Distribuée

## 📋 Description

Application web répartie démontrant une architecture microservices complète avec:
- Frontend React
- Backend Django REST API
- Base de données PostgreSQL
- Conteneurisation avec Docker
- Orchestration avec Kubernetes
- Automatisation avec Ansible
- CI/CD avec Jenkins

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│    (React)      │
│   Port: 3000    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend       │
│   (Django)      │
│   Port: 8000    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   Port: 5432    │
└─────────────────┘
```

## 🚀 Installation et Déploiement

### Prérequis
- Docker Desktop
- Docker Compose
- Minikube
- kubectl
- Ansible
- Python 3.10+
- Node.js 18+
- Git

### 1. Test Local avec Docker Compose

```bash
# Cloner le projet
git clone <votre-repo>
cd distributed-system-project

# Lancer avec Docker Compose
docker-compose up -d

# Vérifier les conteneurs
docker-compose ps

# Accéder à l'application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# Admin Django: http://localhost:8000/admin
```

### 2. Déploiement Kubernetes

```bash
# Démarrer Minikube
minikube start

# Appliquer les manifests
kubectl apply -f kubernetes/

# Vérifier le déploiement
kubectl get pods -n distributed-app
kubectl get services -n distributed-app

# Obtenir l'URL de l'application
minikube service frontend -n distributed-app --url
```

### 3. Automatisation avec Ansible

```bash
cd ansible

# Installer l'infrastructure
ansible-playbook -i inventory.ini setup-infrastructure.yml

# Déployer sur Kubernetes
ansible-playbook -i inventory.ini deploy-kubernetes.yml
```

### 4. CI/CD avec Jenkins

```bash
# Accéder à Jenkins
http://localhost:8080

# Récupérer le mot de passe initial
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Configuration:
# 1. Installer les plugins recommandés
# 2. Ajouter les credentials Docker Hub
# 3. Créer un nouveau pipeline
# 4. Pointer vers le Jenkinsfile du projet
```

## 📂 Structure du Projet

```
distributed-system-project/
├── backend/
│   ├── api/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── myproject/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── initial_data.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── kubernetes/
│   ├── namespace.yaml
│   ├── postgres-*.yaml
│   ├── backend-*.yaml
│   └── frontend-*.yaml
├── ansible/
│   ├── inventory.ini
│   ├── setup-infrastructure.yml
│   └── deploy-kubernetes.yml
├── docker-compose.yml
└── Jenkinsfile
```

## 🔧 Technologies Utilisées

- **Frontend**: React 18, Axios
- **Backend**: Django 4.2, Django REST Framework
- **Base de données**: PostgreSQL 15
- **Conteneurisation**: Docker, Docker Compose
- **Orchestration**: Kubernetes, Minikube
- **Automatisation**: Ansible
- **CI/CD**: Jenkins
- **Serveur web**: Nginx

## 📊 API Endpoints

- `GET /api/` - Page d'accueil de l'API
- `GET /api/utilisateurs/` - Liste des utilisateurs
- `POST /api/utilisateurs/` - Créer un utilisateur
- `GET /api/utilisateurs/{id}/` - Détails d'un utilisateur
- `PUT /api/utilisateurs/{id}/` - Modifier un utilisateur
- `DELETE /api/utilisateurs/{id}/` - Supprimer un utilisateur
- `GET /api/produits/` - Liste des produits
- `POST /api/produits/` - Créer un produit

## 🧪 Tests

```bash
# Backend
cd backend
python manage.py test

# Frontend
cd frontend
npm test
```

## 📝 Commandes Utiles

### Docker
```bash
# Reconstruire les images
docker-compose build

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Nettoyer les volumes
docker-compose down -v
```

### Kubernetes
```bash
# Voir les pods
kubectl get pods -n distributed-app

# Voir les logs d'un pod
kubectl logs <pod-name> -n distributed-app

# Redémarrer un deployment
kubectl rollout restart deployment/<deployment-name> -n distributed-app

# Supprimer tous les resources
kubectl delete namespace distributed-app
```

### Minikube
```bash
# Dashboard Kubernetes
minikube dashboard

# Arrêter Minikube
minikube stop

# Supprimer Minikube
minikube delete
```

## 🐛 Troubleshooting

### Problème de connexion à la base de données
```bash
# Vérifier que PostgreSQL est démarré
docker-compose ps postgres
kubectl get pods -n distributed-app | grep postgres
```

### Images Docker non trouvées
```bash
# Reconstruire les images
docker-compose build --no-cache
```

### Problèmes de permissions
```bash
# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER
newgrp docker
```

## 👥 Auteurs

Projet réalisé dans le cadre du cours de Système Réparti

## 📄 Licence

Ce projet est à usage éducatif uniquement.
