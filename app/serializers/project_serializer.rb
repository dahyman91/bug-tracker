class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :users, :roles, :tickets
  has_many :users, through: :roles
  has_many :roles
  has_many :tickets, through: :tickets_as_assignee

end
