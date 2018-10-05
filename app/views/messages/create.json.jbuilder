json.id @message.id
json.user_name @message.user.name
json.text @message.text
json.image @message.image.url
json.date @message.created_at.to_s(:datetime)