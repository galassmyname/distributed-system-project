from django.db import models

class Utilisateur(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20, blank=True)
    date_inscription = models.DateTimeField(auto_now_add=True)
    actif = models.BooleanField(default=True)

    def __str__(self):
        return self.nom

    class Meta:
        ordering = ['-date_inscription']


class Produit(models.Model):
    nom = models.CharField(max_length=200)
    description = models.TextField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    categorie = models.CharField(max_length=100)
    date_ajout = models.DateTimeField(auto_now_add=True)
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.nom

    class Meta:
        ordering = ['-date_ajout']
