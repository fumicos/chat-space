# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: false|
|email|string|null: false, foreign_key: false|

### Index

- add_index :users,  :name

### Association

- has_many :groups, through :members
- has_many :members
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: false|

### Association

- has_many :users, through :members
- has_many :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: false|
|image|text|null: true, foreign_key: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user


## membersテーブル（groups_usersの中間テーブル）

|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user
