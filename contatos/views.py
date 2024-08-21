from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contato
from django.core.mail import send_mail


@csrf_exempt
def enviar_contato(request):
    email = request.POST.get('name')
    if email:
        print('teste')
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        print(name,email,message)
        try:
            Contato.objects.create(name=name, email=email, message=message)

            send_mail(
                'Novo Contato Recebido',
                f'Nome: {name}\nEmail: {email}\nMensagem: {message}',
                'contato@xflavors.net',
                ['ageraseev@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({'success': True})

        except Exception as e:
            print(e)  # Log the error for debugging
            return JsonResponse({'success': False})

    return JsonResponse({'success': False})