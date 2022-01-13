class User < ApplicationRecord
  has_secure_password
  has_many :tickets_as_submitter, class_name: 'Ticket', foreign_key: 'submitter_id'
  has_many :tickets_as_assignee, class_name: 'Ticket', foreign_key: 'assignee_id'
  # has_many :tickets_as_commenter, class_name: 'ticket', foreign_key: 'commenter_id'
  has_many :tickets
  has_many :comments
  has_many :roles
  has_many :memberships
  has_many :teams, through: :memberships
  has_many :projects, through: :roles
end
