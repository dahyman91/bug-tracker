class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :users, :roles
  has_many :users, through: :roles
  has_many :roles

end
