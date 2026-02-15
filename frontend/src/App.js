import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [apiStatus, setApiStatus] = useState(null);
  
  // États pour les formulaires
  const [showUserForm, setShowUserForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // États pour les formulaires de données
  const [userForm, setUserForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    actif: true
  });
  
  const [productForm, setProductForm] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie: '',
    disponible: true
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Vérifier le statut de l'API
      const statusResponse = await axios.get(`${API_URL}/api/`);
      setApiStatus(statusResponse.data);

      // Récupérer les utilisateurs
      const utilisateursResponse = await axios.get(`${API_URL}/api/utilisateurs/`);
      setUtilisateurs(utilisateursResponse.data.results || utilisateursResponse.data);

      // Récupérer les produits
      const produitsResponse = await axios.get(`${API_URL}/api/produits/`);
      setProduits(produitsResponse.data.results || produitsResponse.data);

      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setLoading(false);
    }
  };

  // ========== CRUD UTILISATEURS ==========
  
  const handleUserFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserForm({
      ...userForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/utilisateurs/`, userForm);
      alert('✅ Utilisateur créé avec succès !');
      setUserForm({ nom: '', email: '', telephone: '', actif: true });
      setShowUserForm(false);
      fetchData();
    } catch (error) {
      alert('❌ Erreur lors de la création de l\'utilisateur');
      console.error(error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/utilisateurs/${editingUser.id}/`, userForm);
      alert('✅ Utilisateur modifié avec succès !');
      setEditingUser(null);
      setUserForm({ nom: '', email: '', telephone: '', actif: true });
      fetchData();
    } catch (error) {
      alert('❌ Erreur lors de la modification');
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`${API_URL}/api/utilisateurs/${id}/`);
        alert('✅ Utilisateur supprimé !');
        fetchData();
      } catch (error) {
        alert('❌ Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  const startEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      nom: user.nom,
      email: user.email,
      telephone: user.telephone,
      actif: user.actif
    });
    setShowUserForm(true);
  };

  // ========== CRUD PRODUITS ==========

  const handleProductFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm({
      ...productForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/produits/`, productForm);
      alert('✅ Produit créé avec succès !');
      setProductForm({ nom: '', description: '', prix: '', stock: '', categorie: '', disponible: true });
      setShowProductForm(false);
      fetchData();
    } catch (error) {
      alert('❌ Erreur lors de la création du produit');
      console.error(error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/produits/${editingProduct.id}/`, productForm);
      alert('✅ Produit modifié avec succès !');
      setEditingProduct(null);
      setProductForm({ nom: '', description: '', prix: '', stock: '', categorie: '', disponible: true });
      fetchData();
    } catch (error) {
      alert('❌ Erreur lors de la modification');
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await axios.delete(`${API_URL}/api/produits/${id}/`);
        alert('✅ Produit supprimé !');
        fetchData();
      } catch (error) {
        alert('❌ Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      stock: product.stock,
      categorie: product.categorie,
      disponible: product.disponible
    });
    setShowProductForm(true);
  };

  const renderHome = () => (
    <div className="home-content">
      <h2>Bienvenue sur l'Application Web Répartie</h2>
      <div className="info-card">
        <h3>Architecture Microservices</h3>
        <p>Cette application démontre une architecture de microservices avec :</p>
        <ul>
          <li>Frontend React</li>
          <li>Backend Django REST API</li>
          <li>Base de données PostgreSQL</li>
          <li>Déploiement avec Docker & Kubernetes</li>
          <li>CI/CD avec Jenkins</li>
          <li>Automatisation avec Ansible</li>
        </ul>
      </div>
      
      {apiStatus && (
        <div className="api-status">
          <h3>Statut de l'API</h3>
          <p className="status-online">✓ {apiStatus.message}</p>
          <p>Status: <strong>{apiStatus.status}</strong></p>
        </div>
      )}

      <div className="stats">
        <div className="stat-card">
          <h3>{utilisateurs.length}</h3>
          <p>Utilisateurs</p>
        </div>
        <div className="stat-card">
          <h3>{produits.length}</h3>
          <p>Produits</p>
        </div>
      </div>
    </div>
  );

  const renderUtilisateurs = () => (
    <div className="data-section">
      <div className="section-header">
        <h2>Liste des Utilisateurs</h2>
        <button 
          className="add-btn" 
          onClick={() => {
            setShowUserForm(!showUserForm);
            setEditingUser(null);
            setUserForm({ nom: '', email: '', telephone: '', actif: true });
          }}
        >
          {showUserForm ? '❌ Annuler' : '➕ Ajouter un utilisateur'}
        </button>
      </div>

      {/* Formulaire Utilisateur */}
      {showUserForm && (
        <div className="form-container">
          <h3>{editingUser ? '✏️ Modifier l\'utilisateur' : '➕ Nouvel utilisateur'}</h3>
          <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="nom"
                value={userForm.nom}
                onChange={handleUserFormChange}
                required
                placeholder="Ex: Jean Dupont"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={userForm.email}
                onChange={handleUserFormChange}
                required
                placeholder="Ex: jean@email.com"
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="text"
                name="telephone"
                value={userForm.telephone}
                onChange={handleUserFormChange}
                placeholder="Ex: +221 77 123 45 67"
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="actif"
                  checked={userForm.actif}
                  onChange={handleUserFormChange}
                />
                Compte actif
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingUser ? '💾 Enregistrer' : '➕ Créer'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setShowUserForm(false);
                  setEditingUser(null);
                  setUserForm({ nom: '', email: '', telephone: '', actif: true });
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date d'inscription</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map(user => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.telephone || 'N/A'}</td>
                <td>{new Date(user.date_inscription).toLocaleDateString('fr-FR')}</td>
                <td>
                  <span className={`badge ${user.actif ? 'badge-active' : 'badge-inactive'}`}>
                    {user.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => startEditUser(user)}
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProduits = () => (
    <div className="data-section">
      <div className="section-header">
        <h2>Liste des Produits</h2>
        <button 
          className="add-btn" 
          onClick={() => {
            setShowProductForm(!showProductForm);
            setEditingProduct(null);
            setProductForm({ nom: '', description: '', prix: '', stock: '', categorie: '', disponible: true });
          }}
        >
          {showProductForm ? '❌ Annuler' : '➕ Ajouter un produit'}
        </button>
      </div>

      {/* Formulaire Produit */}
      {showProductForm && (
        <div className="form-container">
          <h3>{editingProduct ? '✏️ Modifier le produit' : '➕ Nouveau produit'}</h3>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="nom"
                value={productForm.nom}
                onChange={handleProductFormChange}
                required
                placeholder="Ex: Ordinateur Portable"
              />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductFormChange}
                required
                placeholder="Description du produit..."
                rows="3"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Prix (FCFA) *</label>
                <input
                  type="number"
                  name="prix"
                  value={productForm.prix}
                  onChange={handleProductFormChange}
                  required
                  placeholder="Ex: 450000"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleProductFormChange}
                  required
                  placeholder="Ex: 25"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Catégorie *</label>
              <input
                type="text"
                name="categorie"
                value={productForm.categorie}
                onChange={handleProductFormChange}
                required
                placeholder="Ex: Informatique"
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="disponible"
                  checked={productForm.disponible}
                  onChange={handleProductFormChange}
                />
                Produit disponible
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingProduct ? '💾 Enregistrer' : '➕ Créer'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                  setProductForm({ nom: '', description: '', prix: '', stock: '', categorie: '', disponible: true });
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-grid">
        {produits.map(produit => (
          <div key={produit.id} className="product-card">
            <h3>{produit.nom}</h3>
            <p className="product-category">{produit.categorie}</p>
            <p className="product-description">{produit.description}</p>
            <div className="product-info">
              <span className="product-price">{Number(produit.prix).toLocaleString('fr-FR')} FCFA</span>
              <span className={`badge ${produit.disponible ? 'badge-active' : 'badge-inactive'}`}>
                Stock: {produit.stock}
              </span>
            </div>
            <div className="card-actions">
              <button 
                className="edit-btn"
                onClick={() => startEditProduct(produit)}
                title="Modifier"
              >
                ✏️ Modifier
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteProduct(produit.id)}
                title="Supprimer"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Système Réparti - Application Web</h1>
        <nav>
          <button 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            Accueil
          </button>
          <button 
            className={activeTab === 'utilisateurs' ? 'active' : ''} 
            onClick={() => setActiveTab('utilisateurs')}
          >
            Utilisateurs
          </button>
          <button 
            className={activeTab === 'produits' ? 'active' : ''} 
            onClick={() => setActiveTab('produits')}
          >
            Produits
          </button>
        </nav>
      </header>

      <main className="App-main">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'utilisateurs' && renderUtilisateurs()}
        {activeTab === 'produits' && renderProduits()}
      </main>

      <footer className="App-footer">
        <p>Projet Système Réparti - 2025</p>
        <button onClick={fetchData} className="refresh-btn">
          🔄 Rafraîchir les données
        </button>
      </footer>
    </div>
  );
}

export default App;
