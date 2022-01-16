class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :users, :projects
  has_many :users, through: :memberships

  has_many :projects

end
