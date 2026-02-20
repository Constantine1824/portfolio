from django.shortcuts import render
from .models import About, Skills, Projects, Resume
from .serializers import EmailSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

def home(request):
    if request.method == 'POST':
        pass
    skills = Skills.objects.all()
    projects = Projects.objects.all()
    about = About.objects.first()  # Safely handles empty table
    resume = Resume.objects.first()  # Get the first resume entry
    context = {
        'about' : about,
        'skills' : skills,
        'projects' : projects,
        'resume' : resume
    }
    return render(request, 'home.html', context=context)

@api_view(['POST'])
def contact(request):
    try:
        serializer = EmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = render_to_string(
            'email.html',
            context={
                "sender" : serializer.data['name'],
                "sender_contact" : serializer.data['email'],
                "message" : serializer.data['message']
            }
        )
        email = EmailMessage(
            serializer.data['subject'],
            message,
            to = [settings.EMAIL_HOST_USER]
        )
        email.content_subtype = 'html'
        email.send(fail_silently=False)
        return Response(
            {
                "status" : 200,
            },
            status= status.HTTP_200_OK
        )
    except Exception as e:
        print(e)
        return Response(
            {
                "status" : 500,
                "detail" : str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
# Create your views here.
