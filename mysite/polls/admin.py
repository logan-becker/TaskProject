from django.contrib import admin

# Register your models here.
from .models import Question, Choice, Comment


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Question Text", {"fields": ["question_text"], "classes": ["collapse"]}),
        ("Date Information", {"fields": ["pub_date"], "classes": ["collapse"]}),
    ]
    inlines = [ChoiceInline]
    list_display = ["question_text", "pub_date", "was_published_recently"]
    list_filter = ["pub_date"]
    search_fields=["question_text"]
    
# add a todo admin class that lists the fieldsets  and additional info here



admin.site.register(Comment)
admin.site.register(Question, QuestionAdmin)


