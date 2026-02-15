from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Utilisateur, Produit
from .serializers import UtilisateurSerializer, ProduitSerializer


@api_view(['GET'])
def api_home(request):
    """Page d'accueil de l'API"""
    return Response({
        'message': 'Bienvenue sur l\'API du système réparti',
        'endpoints': {
            'utilisateurs': '/api/utilisateurs/',
            'produits': '/api/produits/',
        },
        'status': 'online'
    })


class UtilisateurViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les utilisateurs
    """
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer


class ProduitViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les produits
    """
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer
