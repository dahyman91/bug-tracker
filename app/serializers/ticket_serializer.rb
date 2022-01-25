class TicketSerializer < ActiveModel::Serializer
  attributes :id, :assignee_id, :submitter_id, :project_id, :priority, :type, :status, :title, :description, :files, :category, :comments, :created_at, :updated_at
  has_many :comments

end

