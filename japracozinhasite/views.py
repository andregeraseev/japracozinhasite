from django.shortcuts import render

def home(request):

    # free_slots = get_free_slots()
    # formatted_slots = [format_slot(slot) for slot in free_slots]
    # print('formatted_slots',formatted_slots)
    return render(request, 'home/home2.html' )
