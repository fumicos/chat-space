json.messages @latest_messages.each do |message|
  json.user_name message.user.name
  json.date message.created_at.to_s(:datetime)
  json.text message.text
  json.image message.image.url
  json.id message.id
end