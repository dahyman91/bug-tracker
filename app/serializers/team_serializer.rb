class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :users, :projects
  has_many :users, through: :memberships
  # has_many :memberships
  has_many :projects

  # def admin?
  #   membership = object.memberships.find_by(user_id: session[:user_id])
  #   membership.is_admin?
  # end

end
