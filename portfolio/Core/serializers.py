from rest_framework import serializers

class EmailSerializer(serializers.Serializer):
    name = serializers.CharField()
    subject = serializers.CharField()
    email = serializers.CharField()
    message = serializers.CharField()