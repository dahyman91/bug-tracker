class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :admin_teams
  has_many :teams, through: :memberships
  has_many :projects

  def admin_teams
    object.memberships.where(is_admin?: true)
  end
end
