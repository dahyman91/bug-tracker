class TicketUserSerializer < ActiveModel::Serializer
  attributes :id, :assignee_id, :submitter_id, :project_id, :priority, :type, :status, :title,:description, :category, :comments, :created_at, :updated_at, :assignee_name, :submitter_name, :project_name


  def assignee_name
    "#{object.assignee.first_name} #{object.assignee.last_name}"
  end

  def submitter_name
    "#{object.submitter.first_name} #{object.submitter.last_name}"
  end

  def project_name
    object.project.name
  end
end
