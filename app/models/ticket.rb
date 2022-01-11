class Ticket < ApplicationRecord
  belongs_to :assignee, class_name: 'User'
  belongs_to :submitter, class_name: 'User'
  # belongs_to :commenter, class_name: 'User'

  belongs_to :project
  has_many :comments
  # has_many :users, through: :comments
end
