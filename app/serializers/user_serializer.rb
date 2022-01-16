class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :admin_teams
  has_many :teams, through: :memberships
  has_many :projects
  has_many :tickets_as_submitter
  has_many :tickets_as_assignee

  def admin_teams
    object.memberships.where(is_admin?: true)
  end
end
