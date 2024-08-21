# views.py
from django.shortcuts import render
from django.http import JsonResponse
import requests
from django.conf import settings  # Para acessar as variáveis de configuração
from django.views.decorators.http import require_POST
from decouple import config
Api_brevo = config('API_Brevo')

def subscribe_to_newsletter(email):
    print('Entrando no envio para brevo')
    url = "https://api.brevo.com/v3/contacts"
    headers = {
        "accept": "application/json",
        "api-key": Api_brevo,
        "content-type": "application/json"
    }
    payload = {
        "email": email,
        "listIds": [2],  # Substitua pelo ID da lista correta no Brevo
        "updateEnabled": True  # Permite atualizar o contato se ele já existir
    }

    response = requests.post(url, headers=headers, json=payload)
    return response.status_code, response.json()


@require_POST
def subscribe_newsletter(request):

    print('Entrando na inscricao')
    email = request.POST.get('email')
    if email:
        print('estou no Newsletter')
        status_code, response_json = subscribe_to_newsletter(email)
        print("status_code:", status_code)
        if status_code == 201:
            return JsonResponse({'success': True, 'message': 'Cadastrado com sucesso!'})
        elif status_code == 400 and 'alreadyExists' in response_json.get('message', ''):
            print("status_code:", status_code)
            return JsonResponse({'success': False, 'message': 'Este email já está cadastrado.'})
        else:
            print("status_code:", status_code)
            return JsonResponse(
                {'success': False, 'message': response_json.get('message', 'Erro ao cadastrar o email.')})
    return JsonResponse({'success': False, 'message': 'Email inválido.'})


def home(request):
    return render(request, 'home/home.html')