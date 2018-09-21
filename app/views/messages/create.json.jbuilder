json.user_name @message.user.name
json.text @message.text
json.date @message.created_at.to_s(:datetime)