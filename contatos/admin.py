from django.contrib import admin
from .models import Contato

@admin.register(Contato)
class ContatoAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at','enviado')
    search_fields = ('name', 'email', 'message')
    list_filter = ('created_at',)