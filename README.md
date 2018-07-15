# README

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: false|
|email|string|null: false, foreign_key: false|

### Association

- has_many :messages
- has_many :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: false|

### Association

- has_many :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: false|
|image|text|null: false, foreign_key: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :member
- belongs_to :group


## groups_members テーブル（groups と members の中間テーブル）

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: false|
|member_id|integer|null: false, foreign_key: false|
