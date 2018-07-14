# README

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|name|string|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|

### Association

- has_many :posts
- has_many :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|name|string|null: false, foreign_key: true|

### Association

- has_many :members
- has_many :posts

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|post_id|integer|null: false, foreign_key: true|
|text|text|null: false, foreign_key: true|
|image|text|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :member
- belongs_to :group


## group と member の関係を表す中間テーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|member_id|integer|null: false, foreign_key: true|
