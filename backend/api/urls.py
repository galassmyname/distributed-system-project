from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UtilisateurViewSet, ProduitViewSet, api_home

router = DefaultRouter()
router.register(r'utilisateurs', UtilisateurViewSet)
router.register(r'produits', ProduitViewSet)

urlpatterns = [
    path('', api_home, name='api-home'),
    path('', include(router.urls)),
]
