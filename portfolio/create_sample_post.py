import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from Blog.models import BlogPost

def create_sample_post():
    if BlogPost.objects.count() > 0:
        print("Blog posts already exist. Skipping creation.")
        return

    post = BlogPost.objects.create(
        title="Welcome to My New Portfolio",
        content="""
        I am excited to launch my new portfolio website! This platform will serve as a hub for my projects, skills, and thoughts on technology.
        
        I built this site using Django, HTMX, and modern CSS. It features a responsive design, a custom particle network animation, and a fully functional blog.
        
        Stay tuned for more updates on my journey in Backend Development and AI/ML.
        """,
        is_published=True
    )
    print(f"Created sample post: {post.title}")

if __name__ == '__main__':
    create_sample_post()
