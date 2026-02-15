from django.contrib import admin
from .models import Utilisateur, Produit


@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ('nom', 'email', 'telephone', 'date_inscription', 'actif')
    list_filter = ('actif', 'date_inscription')
    search_fields = ('nom', 'email')


@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prix', 'stock', 'categorie', 'disponible', 'date_ajout')
    list_filter = ('disponible', 'categorie', 'date_ajout')
    search_fields = ('nom', 'description')
